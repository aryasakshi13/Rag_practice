import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if(!apiKey){
  throw new Error("GEMINI_API_KEY is not defined in .env");
  
}

const ai = new GoogleGenAI({
    apiKey: apiKey,
});

export async function generateEmbeding( text: string): Promise<number[]>{
   
    if(!text.trim()){
        throw new Error("Text cannot be empty");
    }

    const response = await ai.models.embedContent({
       model:"gemini-embedding-001" ,
       contents:text,
    });

    const embedding = response.embeddings?.[0]?.values;


    if(!embedding){
        throw new Error("Failes to generate embedding");
    }

    return embedding;
}