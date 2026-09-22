// import { GoogleGenAI } from "@google/genai";
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

// const apiKey = process.env.GEMINI_API_KEY;

const apiKey = process.env.JINA_API_KEY;

if(!apiKey){
  throw new Error("GEMINI_API_KEY is not defined in .env");
  
}

// const ai = new GoogleGenAI({
//     apiKey: apiKey,
// });

export async function generateEmbeding( text: string, 
   task:
  | "retrieval.passage"
  | "retrieval.query" = "retrieval.passage"

): Promise<number[]>{
   
    if(!text.trim()){
        throw new Error("Text cannot be empty");
    }

    // const response = await ai.models.embedContent({
    //    model:"gemini-embedding-001" ,
    //    contents:text,
    // });


    const response = await axios.post(
    "https://api.jina.ai/v1/embeddings",
    {
      model: "jina-embeddings-v3",
      input: [text],
      dimensions: 1024,
      task,
      normalized: true,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

    // const embedding = response.embeddings?.[0]?.values;

    const embedding = response.data.data?.[0]?.embedding;


    if(!embedding){
        throw new Error("Failes to generate embedding");
    }

    return embedding;
}