import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const ai = new GoogleGenAI({
  apiKey,
});

export const generateAnswer = async (
  question: string,
  context: string
): Promise<string> => {
  const prompt = `
You are a helpful assistant answering questions using the provided document context.

Rules:
- Answer the question only using the provided context.
- Do not make up information.
- If the answer is not available in the context, say:
  "I couldn't find the answer in the provided document."
- Give a clear and concise answer.

Context:
${context}

Question:
${question}

Answer:
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
  });

  return interaction.output_text || "No answer generated.";
};