import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import type { ChatMessage } from "../rag.js";

dotenv.config();
const geminiApiKey = process.env.GEMINI_API_KEY;
const groqApiKey = process.env.GROQ_API_KEY;

if (!geminiApiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

if (!groqApiKey) {
  throw new Error("GROQ_API_KEY is not defined");
}

const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
});

const groq = new Groq({
  apiKey: groqApiKey
});

export const generateAnswer = async (
  question: string,
  context: string,
  chatHistory: ChatMessage[] = []
): Promise<string> => {
 
   const historyText = chatHistory
    .map((message) => `${message.role}: ${message.content}`)
    .join("\n");


  const prompt = `
You are a helpful assistant answering questions using the provided document context.

Rules:
- Answer the question only using the provided context.
- Do not make up information.
- If the answer is not available in the context, say:
  "I couldn't find the answer in the provided document."
- Give a clear and concise answer.

Conversation history:
${historyText}

Context:
${context}

Question:
${question}

Answer:
`;

  // const interaction = await ai.interactions.create({
  //   model: "gemini-3.6-flash",
  //   input: prompt,
  // });

  // return interaction.output_text || "No answer generated.";



  try {

    console.log(" Generating answer using Gemini...");

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
    });

    const answer =
      interaction.output_text || "No answer generated.";

    console.log("Gemini answer generated successfully");

    return answer;

  } catch (error: any) {

    const statusCode =
      error?.status ??
      error?.statusCode ??
      error?.error?.httpMeta?.response?.status;

    console.log(
      `⚠️ Gemini failed with status: ${statusCode}`
    );

      if (statusCode === 429) {

      console.log(
        "🔄 Gemini quota exceeded. Switching to Groq..."
      );

      try {

        const completion =
          await groq.chat.completions.create({
           model: "openai/gpt-oss-120b",

            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant answering questions using only the provided document context. Do not make up information. If the answer is not available in the context, say: \"I couldn't find the answer in the provided document.\" Give a clear and concise answer.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],

            temperature: 0.2,

            max_completion_tokens: 1000,
          });

        const answer =
          completion.choices[0]?.message?.content;

        if (!answer) {
          throw new Error("Groq returned an empty response");
        }

        console.log("✅ Groq fallback answer generated successfully");

        return answer;

      } catch (groqError) {

        console.error(
          "❌ Groq fallback also failed:",
          groqError
        );

        throw groqError;
      }
    }

        throw error;
  }

  
};