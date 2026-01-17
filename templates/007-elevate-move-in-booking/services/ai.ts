import { GoogleGenAI, Type } from "@google/genai";
import { RuleExtractionResponse } from "../types";

// Helper to initialize AI. 
// Note: We use process.env.API_KEY as per instructions.
const getAI = () => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const extractRulesFromText = async (text: string): Promise<RuleExtractionResponse | null> => {
  const ai = getAI();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a building management assistant. Extract the building move-in rules from the following policy text. 
      If a value is missing, use these defaults: 9am start, 5pm end, 3 hour slots, $500 deposit, no blackout days.
      
      Policy Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            moveInStart: { type: Type.STRING, description: "Start time in HH:mm format (e.g., 09:00)" },
            moveInEnd: { type: Type.STRING, description: "End time in HH:mm format (e.g., 17:00)" },
            slotDuration: { type: Type.NUMBER, description: "Duration of a single slot in hours" },
            depositAmount: { type: Type.NUMBER, description: "Deposit amount in dollars" },
            blackoutDays: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Days of the week when move-ins are not allowed (e.g., Sunday)"
            }
          },
          required: ["moveInStart", "moveInEnd", "slotDuration", "depositAmount", "blackoutDays"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RuleExtractionResponse;
    }
    return null;
  } catch (error) {
    console.error("AI Extraction Failed:", error);
    return null;
  }
};
