import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedArticle, GenerationConfig, Audience } from "../types";

// Initialize Gemini
// Note: In a real app, strict error handling for missing API keys should be implemented.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const articleSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A clear, concise title for the knowledge base article." },
    summary: { type: Type.STRING, description: "A 1-2 sentence summary of the resolution." },
    audience: { type: Type.STRING, enum: ["CLIENT", "INTERNAL"] },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          action: { type: Type.STRING, description: "The main action header." },
          details: { type: Type.STRING, description: "Detailed explanation of the step." },
          codeSnippet: { type: Type.STRING, description: "Optional command line or code snippet if applicable." },
        },
        required: ["action", "details"]
      }
    },
    cautions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Warnings or risks associated with this procedure." },
    redactedItems: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of specific PII (IPs, names, passwords) that were found and sanitized." },
    tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Metadata tags for categorization." }
  },
  required: ["title", "summary", "steps", "cautions", "redactedItems"]
};

export const generateArticle = async (
  ticketText: string,
  config: GenerationConfig
): Promise<GeneratedArticle> => {
  const modelName = "gemini-3-flash-preview";

  const systemInstruction = `
    You are an expert Technical Writer for a Managed Service Provider (MSP).
    Your goal is to convert raw, messy IT support ticket logs into clean, publishable Knowledge Base (KB) articles.
    
    TONE: ${config.tone}.
    AUDIENCE: ${config.audience === Audience.CLIENT ? 'End Users (Non-technical)' : 'IT Technicians (Internal)'}.
    
    RULES:
    1. Extract the core resolution steps logically.
    2. If Redaction is ENABLED: Identify sensitive data (IP addresses, passwords, specific user names, server names) and replace them with generic placeholders (e.g., <Server_IP>, <User_Password>). List what was redacted in the 'redactedItems' array.
    3. If the audience is CLIENT, remove internal jargon, routing details, or blame. Focus on the solution.
    4. If the audience is INTERNAL, include technical specifics, logs paths, and command line arguments.
    5. Format strictly as JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        { role: 'user', parts: [{ text: `Here is the resolved ticket log:\n\n${ticketText}` }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: articleSchema,
        temperature: 0.3, // Low temperature for factual consistency
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    const data = JSON.parse(response.text) as GeneratedArticle;
    // Ensure audience matches the requested enum even if AI hallucinates case
    data.audience = config.audience; 
    return data;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
