import { generateEmbeding } from "./embed.js";
import { searchVectors } from "./vector/searchVectors.js";
import { generateAnswer } from "./llm/generateAnswer.js";
import { rerankResults } from "./reranker/reranker.js";
import { searchBM25 } from "./Bm25/bm25Index.js";

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
    8
  );

  //  keyword Search - BM25 
   console.log("Searching BM25...");

    const bm25Results = searchBM25( question, 10);

    console.log("BM25 Results:", bm25Results.length);


    const denseResults = results.map((result) => ({
         content: result.payload?.content,

         documentName: result.payload?.documentName,

          chunkIndex: result.payload?.chunkIndex,

          qdrantScore: result.score,

          source: "dense",

       })

     );

     const keywordResults = bm25Results.map((result) => ({
          content: result.content,
          documentName: result.documentName,
          chunkIndex: result.chunkIndex,
          qdrantScore: undefined, // No Qdrant score for BM25 results
          bm25Score: result.bm25Score,
          source: "bm25",

      })
    );

    const combinedResults = [...denseResults, ...keywordResults];

    console.log("Total combined results:", combinedResults.length);

    const uniqueResults = Array.from(
      new Map(

        combinedResults.map((result) => [
          `${result.documentName}-${result.chunkIndex}`,
           result,
        ])
      ).values()
    )

    console.log("Unique results after deduplication:", uniqueResults.length);

    // Cohere Reranking 

    console.log("Reranking results...");

    // await rerankResults(
    //   question,
    //   uniqueResults,
    //   5
    // );

    console.log("Reranking completed.");

  //  const results = await searchVectors(
  //     queryEmbedding,
  //     10
  //  );
   
   
  //   const min_score = 0.60

  //  const filterResult = results.filter((result) => result.score >= min_score);


  //   console.log("Total retrieved:", results.length);
  //   console.log("Minimum score:", min_score);
  //   console.log("After filtering:", filterResult.length);

  //   console.log(
  //     "Filtered scores:",
  //     filterResult.map((result) => result.score)
  //   );


  //  Reranker 

   const rerankedResults = await rerankResults(
    question,
    uniqueResults,
    5
  );

  console.log("Total retrieved:", rerankedResults.length);

  // 3. Extract relevant content
  const context = rerankedResults
    .map((result) => result.content)
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

  //  const sources = filterResult.map((result) => ({
  //       score: result.score,
  //       chunkIndex: result.payload?.chunkIndex,
  //       documentName: result.payload?.documentName,
  //   }));

  //  reranler prepare sources

   const sources = rerankedResults.map(
        (result) => ({
            qdrantScore: result.qdrantScore,
            bm25Score: result.bm25Score,
            rerankScore: result.rerankScore,
            chunkIndex:
                result.chunkIndex,

            documentName:
                result.documentName, 
                
            

            source: result.source,
        })



        
    );

  return {
    answer,
    sources,
  };



};