import React, { useState } from "react";
import "../styles/GenerateStory.css";
import Evaluation from "./Evaluation";
import { generateStory, makeDecision, generateImage } from "../api"; // Asegúrate de que el API `generateImage` esté configurado

const GenerateStory = ({ userInputs }) => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]); // Nuevo estado para almacenar imágenes
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [currentChapterCount, setCurrentChapterCount] = useState(0); // Nuevo estado para contar capítulos
  const [decisionActive, setDecisionActive] = useState(false);
  const [decisionOptions, setDecisionOptions] = useState([]);
  const [decisionQuestion, setDecisionQuestion] = useState(""); // Nuevo estado para almacenar la pregunta.

  const handleGenerateStory = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Sending story data to the backend:", userInputs);
      console.log(userInputs.plot.numberOfChapters);
      const response = await generateStory(userInputs);
      console.log("Response from backend:", response);

      // Divide la respuesta en bloques y toma el título y contenido
      const [storyTitleMatch, ...storyContentMatch] = response.split("\n\n");
      const storyTitle = storyTitleMatch?.trim() || "Untitled Story";
      let storyContent = storyContentMatch.join("\n\n").trim();

      // Extraer opciones de decisión y la pregunta
      const decisionStartIndex = storyContent.indexOf("Decisions:");
      const decisionOptions = decisionStartIndex !== -1
        ? storyContent
          .slice(decisionStartIndex) // Captura la sección desde "What should"
          .split("\n") // Divide en líneas.
          .filter((line) => /^\d+\./.test(line.trim())) // Busca líneas con formato de decisión.
          .map((line) => line.trim()) // Limpia espacios.
        : [];

      // Extraer la pregunta completa (línea anterior a las decisiones)
      const decisionQuestion = decisionStartIndex !== -1
        ? storyContent
          .slice(decisionStartIndex)
          .split("\n")[0]
          .trim() // La primera línea en la sección de decisiones.
        : "";

      if (decisionStartIndex !== -1) {
        storyContent = storyContent.slice(0, decisionStartIndex).trim(); // Elimina la sección de decisiones del contenido.
      }



      setTitle(storyTitle);
      setChapters([storyContent]);
      setDecisionOptions(decisionOptions);
      setDecisionQuestion(decisionQuestion); // Almacena la pregunta.
      setDecisionActive(decisionOptions.length > 0);
      const imageUrl = await generateImage({ chapter: storyContent });
      setImages([imageUrl]);
      setCurrentChapterCount(1);
    } catch (err) {
      console.error("Error generating story:", err);
      setError("Failed to generate the story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (decisionNumber) => {
    setLoading(true);
    setError("");
    try {
      const response = await makeDecision({ decision: decisionNumber });
      console.log("Response from backend for decision:", response);

      // Procesar el nuevo capítulo
      const [chapterMatch, ...contentMatch] = response.split("\n\n");
      const newChapter = chapterMatch?.trim() || "Untitled Chapter";
      let newContent = contentMatch.join("\n\n").trim();
      const imageUrl = await generateImage({ chapter: newContent });
      
      // Extraer opciones de decisión y la pregunta
      const decisionStartIndex = newContent.indexOf("*Decisions:*");
      const newDecisionOptions = decisionStartIndex !== -1
        ? newContent
          .slice(decisionStartIndex) // Captura la sección desde "What should"
          .split("\n") // Divide en líneas.
          .filter((line) => /^\d+\./.test(line.trim())) // Busca líneas con formato de decisión.
          .map((line) => line.trim()) // Limpia espacios.
        : [];

      const newDecisionQuestion = decisionStartIndex !== -1
        ? newContent
          .slice(decisionStartIndex)
          .split("\n")[0]
          .trim() // La primera línea en la sección de decisiones.
        : "";

      if (decisionStartIndex !== -1) {
        newContent = newContent.slice(0, decisionStartIndex).trim(); // Elimina la sección de decisiones del contenido.
      }

      setChapters((prevChapters) => [...prevChapters, `${newChapter}\n${newContent}`]);
      setDecisionOptions(newDecisionOptions);
      setDecisionQuestion(newDecisionQuestion); // Actualiza la pregunta.
      setDecisionActive(newDecisionOptions.length > 0);
      setImages((prevImages) => [...prevImages, imageUrl]);
      console.log(currentChapterCount);
      setCurrentChapterCount((prevCount) => prevCount + 1);

      if (currentChapterCount + 1 === userInputs.plot.numberOfChapters) {
        const evaluationStartIndex = newContent.indexOf("**Evaluation:**");
        if (evaluationStartIndex !== -1) {
          const evaluationContent = newContent.slice(evaluationStartIndex).trim(); // Extrae desde esa posición
          newContent = newContent.slice(0, evaluationStartIndex).trim(); // Elimina la evaluación del contenido del capítulo
          setEvaluation(evaluationContent); // Almacena la evaluación
        }
      }
    } catch (err) {
      console.error("Error making decision:", err);
      setError("Failed to continue the story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-story">
      {!chapters.length ? (
        <button
          className="generate-button"
          onClick={handleGenerateStory}
          disabled={loading}
        >
          {loading ? "Generating Story..." : "Generate Story"}
        </button>
      ) : (
        <div className="story-container">
          <h1 className="story-title">{title || "Your Adventure Awaits"}</h1>
          {chapters.map((chapter, index) => (
            <div key={index} className="chapter">
              <h2 className="chapter-title">Chapter {index + 1}</h2>
              <img
                src={images[index] || "../assets/icons/placeholder.jpg"}
                alt={`Chapter ${index + 1} Illustration`}
                className="chapter-image"
              />
              <p className="chapter-content">{chapter}</p>
            </div>
          ))}
          <div className="decision-section">
            {loading ? (
              <div className="loading-indicator">
                <p>Generating story, please wait...</p>
                <div className="spinner"></div> {/* Spinner animado */}
              </div>
            ) : (
              <>
                {decisionActive && currentChapterCount < userInputs.plot.numberOfChapters && (
                  <>
                    <h3 className="decision-title">
                      {decisionQuestion || "What will the character do?"}
                    </h3>
                    <div className="decision-buttons">
                      {decisionOptions.map((option, index) => (
                        <button
                          key={index}
                          className="decision-button"
                          onClick={() => handleDecision(index + 1)}
                          disabled={loading} // Deshabilita mientras carga
                        >
                          {option.trim()}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          {currentChapterCount === userInputs.plot.numberOfChapters && (
            <Evaluation evaluationContent={evaluation} />
          )}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};


export default GenerateStory;
