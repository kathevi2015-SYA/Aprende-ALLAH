import { GoogleGenAI, Type, Modality } from "@google/genai";
import { GeneratedContent, TriviaQuestion } from "../types";

// Initialize the Google GenAI SDK
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

// Helper to clean and parse JSON from AI response
const cleanAndParseJSON = (text: string) => {
  try {
    // Remove markdown code blocks, handling case insensitivity for 'json'
    let cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    // Find the first '{' or '[' to handle cases where AI adds intro text
    const firstBrace = cleaned.indexOf('{');
    const firstBracket = cleaned.indexOf('[');
    
    let startIndex = -1;
    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      startIndex = firstBrace;
    } else if (firstBracket !== -1) {
      startIndex = firstBracket;
    }

    if (startIndex !== -1) {
      const lastBrace = cleaned.lastIndexOf('}');
      const lastBracket = cleaned.lastIndexOf(']');
      const endIndex = Math.max(lastBrace, lastBracket);
      
      if (endIndex !== -1) {
        cleaned = cleaned.substring(startIndex, endIndex + 1);
      }
    }

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    console.log("Raw Text:", text);
    // Fallback for simple cleanup if the substring extraction failed but it was almost valid
    try {
        const simplerClean = text.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(simplerClean);
    } catch (e) {
        throw new Error("Failed to parse generated content");
    }
  }
};

export const getDailyWisdom = async (): Promise<GeneratedContent> => {
  return getIslamicContent("WISDOM");
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
    return cleanAndParseJSON(text);
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
    return cleanAndParseJSON(text);
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
    return cleanAndParseJSON(text);
  } catch (error) {
    return {
      riddle: "Soy un libro sagrado, lleno de luz y verdad. Los musulmanes me leen para encontrar la paz. ¿Qué soy?",
      answer: "El Corán"
    };
  }
};

// New Generic Content Generator for Learn Allah Sections
export const getIslamicContent = async (category: string): Promise<GeneratedContent> => {
  let promptContext = "";
  
  switch(category) {
    case "WISDOM":
      promptContext = "Genera un contenido para niños que incluya una Sura corta o un Hadiz auténtico. Explícalo con amor.";
      break;
    case "LOVE_PROPHET":
      promptContext = "Genera una historia corta o una razón conmovedora para amar al Profeta Muhammad (SAW). Enfócate en su bondad, sonrisa o trato a los niños/animales.";
      break;
    case "DUA_ADAB":
      promptContext = "Enseña una Dua diaria simple (ej: dormir, comer, viajar) O un modal islámico (Adab) importante (ej: sonreír, visitar enfermos). Incluye el árabe si es Dua.";
      break;
    case "AKHLAQ":
      promptContext = "Enseña una lección sobre el Akhlaq (buen carácter) en el Islam: honestidad, paciencia, generosidad, perdón. Usa un ejemplo práctico para niños.";
      break;
    case "QURAN_LIB":
      promptContext = "Genera un dato fascinante o una historia breve sobre el Corán (ej: cómo fue revelado, nombres de suras, milagros lingüísticos simples).";
      break;
    case "TAJWEED":
      promptContext = "Explica una regla simple de Tajweed (ej: Ghunnah, Qalqalah) O la importancia de recitar bonito. Hazlo muy sencillo.";
      break;
    case "SEERAH":
      promptContext = "Cuenta un evento breve y específico de la vida del Profeta Muhammad (SAW) (Seerah). Ej: La Hégira, La noche del Mi'raj, su nacimiento.";
      break;
    case "SCIENCE":
      promptContext = "Explica un hecho científico mencionado en el Corán (embriología, montañas, agua) O un invento de la Edad de Oro del Islam (cámaras, cirugía, vuelo).";
      break;
    default:
      promptContext = "Enséñame algo bonito sobre el Islam.";
  }

  const prompt = `
    ${promptContext}
    Dirigido a niños de 6 a 10 años. Tono alegre, colorido y educativo.
    
    IMPORTANTE: Genera también un 'imagePrompt' en inglés que describa una escena visual estilo "dibujo animado" para ilustrar este contenido. 
    Ejemplo de imagePrompt: "cute cartoon muslim boy sharing food with a cat sunny day simple illustration".
    
    Devuelve JSON:
    {
      "title": "Título divertido",
      "content": "Explicación completa...",
      "arabic": "Texto en árabe (opcional si no aplica)",
      "translation": "Traducción (opcional)",
      "imagePrompt": "Descripción visual en inglés para generar la imagen"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            arabic: { type: Type.STRING },
            translation: { type: Type.STRING },
            imagePrompt: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error("Error fetching content:", error);
    return {
      title: "Bismillahi Rahmani Rahim",
      content: "Siempre empezamos con el nombre de Allah. ¡Intenta decirlo antes de hacer cualquier cosa buena!",
      arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      translation: "En el nombre de Dios, el Clemente, el Misericordioso.",
      imagePrompt: "cute cartoon muslim kids raising hands in prayer bright colors happy"
    };
  }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: {
        parts: [{ text: text }],
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Aoede' }, // Soft, friendly voice
          },
        },
      },
    });
    
    // Handle the response structure for audio
    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return audioData || null;
  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
};