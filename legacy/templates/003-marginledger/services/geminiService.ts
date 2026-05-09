import { GoogleGenAI } from "@google/genai";
import { AnalysisSummary } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCapPolicy = async (
  analysis: AnalysisSummary
): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "Error: API Key missing. Unable to generate policy.";
  }

  // Calculate some stats to feed the prompt
  const loserCount = analysis.customers.filter(c => c.status === 'danger').length;
  const avgLoss = analysis.topLosers.reduce((acc, c) => acc + c.margin, 0) / (analysis.topLosers.length || 1);
  const worstOffender = analysis.topLosers[0];

  const prompt = `
    You are a SaaS finance and legal expert. 
    Based on the following unit economics data, draft a "Fair Use & Overage" clause for our Terms of Service.
    
    Data Context:
    - Target Margin: ${analysis.targetMargin}%
    - Current Overall Margin: ${analysis.overallMarginPercent.toFixed(1)}%
    - Number of unprofitable customers: ${loserCount}
    - Worst offender stats: Plan ${worstOffender?.plan}, Revenue $${worstOffender?.revenue}, Cost $${worstOffender?.cost} (Margin: ${worstOffender?.marginPercent}%)
    
    The goal is to stop the bleeding from these heavy users without scaring away normal users.
    
    Output Format:
    Return ONLY the raw text for the clause. No markdown formatting like bolding or headers.
    Include a recommended specific "Hard Cap" number (in USD cost equivalent or Tokens) and an "Overage Price" per unit.
    Keep the tone professional, firm, but fair (Stripe-like).
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Failed to generate policy.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating policy. Please try again later.";
  }
};
