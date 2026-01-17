import { GoogleGenAI, Type } from "@google/genai";
import { StoreStats, BriefContent } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables.");
    // In a real app, handle this gracefully. For this demo, we might fail or return mock AI response.
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBrief = async (stores: StoreStats[]): Promise<BriefContent> => {
  const ai = getAiClient();
  
  if (!ai) {
    // Fallback if no key provided in demo environment
    return {
      headline: "Daily Summary Unavailable",
      executiveSummary: "Please configure your API key to generate insights. We've aggregated your data below, showing a mixed performance across your connected stores.",
      anomaly: { detected: false, description: "No analysis available.", severity: 'low' },
      topPerformer: "N/A",
      actionItem: "Check connection settings."
    };
  }

  const prompt = `
    You are a senior business analyst for a multi-store ecommerce owner.
    Analyze the following sales data for today compared to yesterday.
    
    Data: ${JSON.stringify(stores, null, 2)}
    
    Write a "Daily Brief" in a concise, "Morning Brew" or newspaper style.
    It should be professional but friendly (founder-friendly).
    
    Requirements:
    1. headline: A catchy 3-5 word summary of the day (e.g., "North Shore leads a green day").
    2. executiveSummary: 2-3 sentences summarizing total performance and trends. Mention specific stores if relevant.
    3. anomaly: Check for huge drops or spikes (>20% change or unusually low conversion). If found, describe it briefly.
    4. topPerformer: The name of the best performing store and why.
    5. actionItem: One concrete thing the owner should check or do based on this data.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            executiveSummary: { type: Type.STRING },
            anomaly: {
              type: Type.OBJECT,
              properties: {
                detected: { type: Type.BOOLEAN },
                description: { type: Type.STRING },
                severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
              },
              required: ['detected', 'description', 'severity']
            },
            topPerformer: { type: Type.STRING },
            actionItem: { type: Type.STRING }
          },
          required: ['headline', 'executiveSummary', 'anomaly', 'topPerformer', 'actionItem']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    
    return JSON.parse(text) as BriefContent;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      headline: "Analysis Interrupted",
      executiveSummary: "We encountered a hiccup generating your personalized analysis. Your raw data is available below.",
      anomaly: { detected: false, description: "", severity: 'low' },
      topPerformer: "Check Data Below",
      actionItem: "Refresh to try analysis again."
    };
  }
};