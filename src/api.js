import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Endpoint para generar una historia
export const generateStory = async (storyData) => {
  try {
    const response = await API.post("/chatgpt/story", storyData);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error generating story:", error);
    throw error;
  }
};

// Endpoint para manejar decisiones
export const makeDecision = async (decisionData) => {
  try {
    const response = await API.post("/chatgpt/decision", decisionData);
    return response.data; // Devuelve la continuación de la historia
  } catch (error) {
    console.error("Error making decision:", error);
    throw error;
  }
};

export default API;
