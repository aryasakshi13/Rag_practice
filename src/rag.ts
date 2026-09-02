import { generateEmbeding } from "./embed.js";
import { searchVectors } from "./vector/searchVectors.js";
import { generateAnswer } from "./llm/generateAnswer.js";

export const askQuestion = async (
    question:string 
) =>{
    console.log("Question", question);

    console.log("\nGenerating query embedding...");
    
     const queryEmbedding = await generateEmbeding(
        question,
        "retrieval.query"
    );

      // 2. Search Qdrant
  console.log("Searching Qdrant...");

  const results = await searchVectors(
    queryEmbedding,
    5
  );

  // 3. Extract relevant content
  const context = results
    .map((result) => result.payload?.content)
    .filter(
      (content): content is string =>
        typeof content === "string"
    )
    .join("\n\n");

  // 4. Send context + question to LLM
  console.log("Generating answer...");

  const answer = await generateAnswer(
    question,
    context
  );

   const sources = results.map((result) => ({
        score: result.score,
        chunkIndex: result.payload?.chunkIndex,
        documentName: result.payload?.documentName,
    }));

  return {
    answer,
    sources,
  };



};