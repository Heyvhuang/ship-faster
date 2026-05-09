import { CustomerMetric } from "../types";

export const generatePolicy = async (
  losers: CustomerMetric[],
  targetMargin: number
): Promise<string> => {
  try {
    const response = await fetch('/api/generate-policy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ losers, targetMargin }),
    });

    if (!response.ok) {
      return "Error generating policy. Please check API key configuration.";
    }

    const data = await response.json();
    return data.policy || "Unable to generate policy at this time.";
  } catch {
    return "Error generating policy. Please check API key configuration.";
  }
};
