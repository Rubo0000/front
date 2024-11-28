import React, { useState } from "react";
import "../styles/GenerateStory.css";
import placeholderImage from "../assets/icons/placeholder.jpg";
import { generateStory, makeDecision } from "../api";

const GenerateStory = ({ userInputs }) => {
  const [title, setTitle] = useState("");
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [decisionActive, setDecisionActive] = useState(false);
  const [decisionOptions, setDecisionOptions] = useState([]);

  const handleGenerateStory = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Sending story data to the backend:", userInputs);
      const response = await generateStory(userInputs);
      console.log("Response from backend:", response);
  
      // Ajusta el formato según la respuesta
      const [storyTitleMatch, ...storyContentMatch] = response.split("\n\n"); // Divide por doble salto de línea
      const storyTitle = storyTitleMatch?.trim() || "Untitled Story";
      const storyContent = storyContentMatch.join("\n\n").trim();
  
      // Extraer opciones de decisión (si existen)
      const optionsMatch = storyContent.match(/Decision:\n(.*?\n.*?)/);
      const decisionOptions = optionsMatch
        ? optionsMatch[1]
            .split("\n")
            .filter((line) => line.trim().length > 0)
            .map((option) => option.trim())
        : [];
  
      setTitle(storyTitle);
      setChapters([storyContent]);
      setDecisionOptions(decisionOptions);
      setDecisionActive(decisionOptions.length > 0);
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
  
      // Procesar el nuevo capítulo y decisiones
      const [chapterMatch, ...contentMatch] = response.split("\n\n");
      const newChapter = chapterMatch?.trim() || "Untitled Chapter";
      const newContent = contentMatch.join("\n\n").trim();
  
      // Extraer nuevas decisiones
      const optionsMatch = newContent.match(/Decision:\n([\s\S]*?)\n\n/); // Busca todas las opciones de decisión hasta un doble salto de línea
      const newDecisionOptions = optionsMatch
        ? optionsMatch[1]
            .split("\n") // Divide las líneas
            .filter((line) => line.trim().length > 0) // Elimina líneas vacías
            .map((option) => option.trim()) // Limpia espacios
        : [];
  
      setChapters((prevChapters) => [...prevChapters, `${newChapter}\n${newContent}`]);
      setDecisionOptions(newDecisionOptions); // Actualiza con todas las opciones extraídas
      setDecisionActive(newDecisionOptions.length > 0);
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
          <img src={placeholderImage} alt="Story Placeholder" className="story-image" />
          {chapters.map((chapter, index) => (
            <div key={index} className="chapter">
              <h2 className="chapter-title">Chapter {index + 1}</h2>
              <p className="chapter-content">{chapter}</p>
            </div>
          ))}
          {decisionActive && (
            <div className="decision-section">
              <h3 className="decision-title">What will the character do?</h3>
              <div className="decision-buttons">
                {decisionOptions.map((option, index) => (
                  <button
                    key={index}
                    className="decision-button"
                    onClick={() => handleDecision(index + 1)}
                    disabled={loading}
                  >
                    {option.trim()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default GenerateStory;
