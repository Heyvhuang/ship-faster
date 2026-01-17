import { GoogleGenAI, Type } from "@google/genai";
import { KanbanCard, AgendaItem } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

const getFallbackAgenda = (): AgendaItem[] => [
  { title: "Review Blocked Items", description: "Several items are flagged as blocked.", type: "risk", cards: [] },
  { title: "Check Old Cards", description: "Some items have been in progress for a long time.", type: "aging", cards: [] },
  { title: "Workload Balance", description: "Review assignment distribution.", type: "bottleneck", cards: [] }
];

export const generateAgenda = async (cards: KanbanCard[], agingThreshold: number): Promise<AgendaItem[]> => {
  const ai = getAI();
  if (!ai) {
    console.warn("No API key configured, using fallback agenda");
    return getFallbackAgenda();
  }
  
  const model = "gemini-3-flash-preview";

  const prompt = `
    Analyze the following Kanban board data and generate a meeting agenda with exactly 3 top discussion items.
    Focus on:
    1. Bottlenecks (people with too many items in progress).
    2. Aging cards (items older than ${agingThreshold} days).
    3. Blocked items.
    
    Data:
    ${JSON.stringify(cards.map(c => ({
      id: c.id,
      title: c.title,
      assignee: c.assignee,
      status: c.status,
      isBlocked: c.isBlocked,
      days: c.daysInStatus
    })))}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['bottleneck', 'aging', 'risk', 'general'] },
              cards: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "description", "type"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as AgendaItem[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails
    return [
      { title: "Review Blocked Items", description: "Several items are flagged as blocked.", type: "risk", cards: [] },
      { title: "Check Old Cards", description: "Some items have been in progress for a long time.", type: "aging", cards: [] },
      { title: "Workload Balance", description: "Review assignment distribution.", type: "bottleneck", cards: [] }
    ];
  }
};
