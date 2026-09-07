import { askQuestion } from "../rag.js";
import { initializeBM25 } from "../Bm25/initializeBM25.js";
import { evaluationQuestions } from "./evaluation.js";

await initializeBM25();

console.log("\n====================================");
console.log("RAG EVALUATION STARTED");
console.log("====================================");

for (const item of evaluationQuestions) {
  console.log("\n\n====================================");
  console.log(`QUESTION ${item.id}`);
  console.log("====================================");

  console.log("Question:", item.question);
  console.log("Category:", item.category);

  try {
    const result = await askQuestion(item.question);

    console.log("\nEXPECTED:");
    console.log(item.expectedAnswer);

    console.log("\nGENERATED ANSWER:");
    console.log(result.answer);

    console.log("\nSOURCES:");

    if (!result.sources || result.sources.length === 0) {
      console.log("No sources returned.");
    } else {
      console.log(
        result.sources.map((source) => ({
          chunkIndex: source.chunkIndex,
          rerankScore: source.rerankScore,
          rrfScore: source.rrfScore,
          source: source.source,
        }))
      );
    }
  } catch (error) {
    console.error("\nERROR:");
    console.error(error);
  }
}

console.log("\n====================================");
console.log("RAG EVALUATION FINISHED");
console.log("====================================");