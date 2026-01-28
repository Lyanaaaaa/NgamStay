
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getNeighborhoodInsight = async (neighborhood: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a 2-sentence punchy summary of the "${neighborhood}" neighborhood in Malaysia for a young renter. Focus on lifestyle, transport, and safety. Keep it conversational.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "A vibrant area with great local amenities and growing accessibility.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "This neighborhood offers a unique blend of modern convenience and local Malaysian charm.";
  }
};
