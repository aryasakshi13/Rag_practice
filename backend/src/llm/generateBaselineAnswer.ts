import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const groqApiKey = process.env.GROQ_API_KEY;

if (!geminiApiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

if (!groqApiKey) {
  throw new Error("GROQ_API_KEY is not defined");
}

const gemini = new GoogleGenAI({
  apiKey: geminiApiKey,
});

const groq = new Groq({
  apiKey: groqApiKey,
});

const GROQ_MODEL = "openai/gpt-oss-120b";

export const generateBaselineAnswer = async (
  question: string
): Promise<string> => {

  const prompt = `
Answer the following question clearly and concisely.

Question:
${question}

Answer:
`;

  try {

    console.log(" Baseline: Trying Gemini...");

    const response = await gemini.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
    });

    return response.output_text || "No answer generated.";

  } catch (error: any) {

    console.log(
      ` Baseline Gemini failed with status: ${error?.status}`
    );

    console.log("Switching to Groq...");

    try {

      const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0,
      });

      return (
        completion.choices[0]?.message?.content ||
        "No answer generated."
      );

    } catch (groqError) {

      console.error("❌ Baseline Groq failed:", groqError);

      throw groqError;
    }
  }
};