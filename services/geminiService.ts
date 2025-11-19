import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent, TriviaQuestion } from "../types";

// Initialize the Google GenAI SDK
// Note: In a real scenario, you should use a proxy or backend to hide the API key.
// For this demo, we rely on the environment variable being present.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

export const getDailyWisdom = async (): Promise<GeneratedContent> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: "Genera un contenido para niños musulmanes que incluya una Sura corta del Corán (o unos versos) y un Hadiz auténtico corto. Explícalo de forma muy sencilla y alegre para un niño de 6 años. Devuelve el resultado en formato JSON con los campos: 'title', 'content' (la explicación), 'arabic' (el texto en árabe), 'translation' (traducción al español).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            arabic: { type: Type.STRING },
            translation: { type: Type.STRING },
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) throw new Error("No content generated");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching daily wisdom:", error);
    return {
      title: "Bismillahi Rahmani Rahim",
      content: "Hoy aprendemos a decir Bismillah antes de comer. Significa 'En el nombre de Allah'. ¡Es como pedirle permiso y bendiciones a Allah para nuestra comida!",
      arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      translation: "En el nombre de Dios, el Clemente, el Misericordioso."
    };
  }
};

export const getProphetStory = async (prophetName: string): Promise<GeneratedContent> => {
  try {
    const prompt = `
      Escribe una historia detallada y emocionante sobre el Profeta ${prophetName} para niños de 8 a 10 años.
      La historia debe tener unas 300 palabras aproximadamente.
      Evita mencionar representaciones físicas del profeta.
      Estructura la historia para que sea fácil de leer.
      Incluye:
      1. Quién era y dónde vivía.
      2. El mensaje que Allah le dio.
      3. El gran milagro o evento principal.
      4. Una lección clara al final.
      
      Devuelve el resultado en formato JSON con los campos: 'title' (un título llamativo) y 'content' (el texto completo de la historia).
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING }
          }
        }
      }
    });
    const text = response.text;
    if(!text) throw new Error("No story generated");
    return JSON.parse(text);
  } catch (error) {
    return {
      title: `Historia de ${prophetName}`,
      content: "Hubo un pequeño error conectando con la biblioteca de historias. Por favor, verifica tu conexión e inténtalo de nuevo. Insha'Allah funcionará pronto."
    };
  }
};

export const getTriviaQuestions = async (): Promise<TriviaQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: "Genera 5 preguntas de trivia sobre los Pilares del Islam y los Pilares de la Fe (Iman) para niños. Formato JSON array.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING }
            }
          }
        }
      }
    });
    const text = response.text;
    if(!text) return [];
    return JSON.parse(text);
  } catch (error) {
    return [
      {
        question: "¿Cuántos pilares tiene el Islam?",
        options: ["3", "5", "1"],
        correctAnswer: "5"
      }
    ];
  }
};

export const getRiddle = async (): Promise<{riddle: string, answer: string}> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: "Crea una adivinanza divertida sobre algo relacionado con el Islam (ej: Ramadán, Meca, Rezar, Corán) para niños. JSON: riddle, answer.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riddle: { type: Type.STRING },
            answer: { type: Type.STRING }
          }
        }
      }
    });
    const text = response.text;
    if(!text) throw new Error("No riddle");
    return JSON.parse(text);
  } catch (error) {
    return {
      riddle: "Soy un libro sagrado, lleno de luz y verdad. Los musulmanes me leen para encontrar la paz. ¿Qué soy?",
      answer: "El Corán"
    };
  }
};