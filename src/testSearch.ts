import "dotenv/config";

import { generateEmbeding } from "./embed.js";
import { searchVectors } from "./vector/searchVectors.js";

const main = async () => {
  const question =
    "What is Dharma according to Bhagavad Gita?";

  console.log("Question:");
  console.log(question);

  console.log("\nGenerating query embedding...");

  const queryEmbedding = await generateEmbeding(
    question,
    "retrieval.query"
  );

  console.log(
    "Query embedding size:",
    queryEmbedding.length
  );

  console.log("\nSearching Qdrant...");

  const results = await searchVectors(
    queryEmbedding,
    5
  );

  console.log("\nRelevant chunks:\n");

  results.forEach((result, index) => {
    console.log(`========== Result ${index + 1} ==========`);

    console.log("Score:", result.score);

    console.log(
      "Chunk:",
      result.payload?.chunkIndex
    );

    console.log(
      "Document:",
      result.payload?.documentName
    );

    console.log(
      "Content:",
      result.payload?.content
    );
  });
};

main().catch(console.error);