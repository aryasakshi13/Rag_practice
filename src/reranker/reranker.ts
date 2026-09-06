import "dotenv/config";

import { CohereClientV2 } from "cohere-ai";


const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY || "",
});

export const rerankResults = async(
    question: string,
    results:any[],
    topN: number = 5
   ) => {
    const documents = results.map((result) => result.content).filter(
        (content): content is string =>
            typeof content === "string"
    );

      if (documents.length === 0) {
        return [];
    }

    console.log(
        `Reranking ${documents.length} documents...`
    );

    const response = await cohere.rerank({
        model: "rerank-v3.5",
        query: question,
        documents,
        topN,
    });

    return response.results.map((item) => {
        const originalResult = results[item.index];

        return {
            ...originalResult,

            // Keep Qdrant score
            qdrantScore: originalResult.score,

            // Add reranker score
            rerankScore: item.relevanceScore,
        };

    });
    
}