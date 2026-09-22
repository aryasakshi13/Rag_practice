import { askQuestion } from "./rag.js";

const main = async () => {
  const question =
    "What is Dharma according to Bhagavad Gita?";

  const result = await askQuestion(question);

  console.log("\n==============================");
  console.log("FINAL ANSWER");
  console.log("==============================\n");

  console.log(result.answer);

  console.log("\n==============================");
  console.log("SOURCES");
  console.log("==============================\n");

  result.sources.forEach((source, index) => {
    console.log(
      `${index + 1}. Chunk ${source.chunkIndex}`
    );

    console.log(
                `Qdrant Score: ${source.qdrantScore}`
            );


    console.log(
      `BM25 Score: ${source.bm25Score}`
    );

    console.log(
                `Rerank Score: ${source.rerankScore}`
            );

    console.log();

      console.log(
                `Document: ${source.documentName}`
            );

            console.log();
  });
};

main().catch(console.error);