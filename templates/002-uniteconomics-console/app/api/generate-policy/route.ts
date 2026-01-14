import { GoogleGenAI } from '@google/genai';

type PolicyRequest = {
  losers?: Array<{
    name?: string;
    plan?: string;
    revenue?: number;
    cost?: number;
    marginPercent?: number;
  }>;
  targetMargin?: number;
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Missing GEMINI_API_KEY' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let payload: PolicyRequest;
  try {
    payload = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const losers = Array.isArray(payload.losers) ? payload.losers : [];
  const targetMargin = typeof payload.targetMargin === 'number' ? payload.targetMargin : 0;

  const losersSummary = losers
    .map((l) => {
      const name = l.name ?? 'Unknown';
      const plan = l.plan ?? 'Unknown';
      const revenue = typeof l.revenue === 'number' ? l.revenue : 0;
      const cost = typeof l.cost === 'number' ? l.cost : 0;
      const marginPercent = typeof l.marginPercent === 'number' ? l.marginPercent : 0;
      return `- Customer: ${name} (${plan}), Revenue: $${revenue}, Cost: $${cost}, Margin: ${marginPercent}%`;
    })
    .join('\n');

  const prompt = `
    You are a pricing strategist for an AI SaaS company.
    Our target gross margin is ${targetMargin}%.

    Here is a list of our most unprofitable customers who are dragging down our unit economics:
    ${losersSummary}

    Based on this data, generate a concise "Fair Use & Overage Policy" update.
    1. Suggest a specific Hard Cap on usage (tokens/credits) based on the abuse patterns seen above.
    2. Suggest an Overage Price (per 1k tokens) that would make these customers profitable.
    3. Draft a 2-paragraph email notification we can send to these specific customers about the policy change.

    Keep the tone professional, firm, but fair. "Financial Ledger" style - direct and actionable.
  `;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const policy = response.text || 'Unable to generate policy at this time.';
    return new Response(JSON.stringify({ policy }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Error generating policy. Please check API key configuration.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
