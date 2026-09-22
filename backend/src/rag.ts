import { generateEmbeding } from "./embed.js";
import { searchVectors } from "./vector/searchVectors.js";
import { generateAnswer } from "./llm/generateAnswer.js";
import { rerankResults } from "./reranker/reranker.js";
import { searchBM25 } from "./Bm25/bm25Index.js";
import { reciprocalRankFusion } from "./retrieval/rrf.js";


export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const askQuestion = async (
    question:string ,
    chatHistory: ChatMessage[] = []
) =>{
    console.log("Question", question);

    const historyText = chatHistory
  .map((message) => `${message.role}: ${message.content}`)
  .join("\n");

const standaloneQuestion = await rewriteQuery(
  question,
  historyText
);

console.log("Rewritten Question:", standaloneQuestion);

    console.log("\nGenerating query embedding...");
    
     const queryEmbedding = await generateEmbeding(
        standaloneQuestion,
        "retrieval.query"
    );

      // 2. Search Qdrant
  console.log("Searching Qdrant...");

  const results = await searchVectors(
    queryEmbedding,
    20
  );

  //  keyword Search - BM25 
   console.log("Searching BM25...");

    // const bm25Results = searchBM25( question, 20);
    const bm25Results = searchBM25(standaloneQuestion, 20);

    console.log("BM25 Results:", bm25Results.length);


    const denseResults = results.map((result) => ({
         content: result.payload?.content,

         documentName: result.payload?.documentName,

          chunkIndex: result.payload?.chunkIndex,

          qdrantScore: result.score,
           
          
          source: "dense" as const,

       }))
       .filter(
        (
        result
       ): result is {
         content: string;
          documentName: string;
          chunkIndex: number;
          qdrantScore: number;
          source: "dense";
       } =>
        typeof result.content === "string" &&
        typeof result.documentName === "string" &&
        typeof result.chunkIndex === "number"  
      );



     const keywordResults = bm25Results.map((result) => ({
          content: result.content,
          documentName: result.documentName,
          chunkIndex: result.chunkIndex,
          bm25Score: result.bm25Score,
          source: "bm25" as const,

      })
    );
    //  .........
        // normal fusion - not rrf 
        // .........

    // const combinedResults = [...denseResults, ...keywordResults];

    // console.log("Total combined results:", combinedResults.length);

    // const uniqueResults = Array.from(
    //   new Map(

    //     combinedResults.map((result) => [
    //       `${result.documentName}-${result.chunkIndex}`,
    //        result,
    //     ])
    //   ).values()
    // )

    // console.log("Unique results after deduplication:", uniqueResults.length);

    

    // ........
    //  rrf fusion
    // .........


      const fusedResults = reciprocalRankFusion(
          denseResults,
          keywordResults
      );

    console.log(
      "Total fused results:",
      fusedResults.length
    );

    console.log(
      "RRF Results:",
      fusedResults.map((result) => ({
        chunkIndex: result.chunkIndex,
        rrfScore: result.rrfScore,
        qdrantScore: result.qdrantScore,
        bm25Score: result.bm25Score,
        source: result.source
      }))
    );

    // ......
    // Cohere Reranking 
    // .....

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



   const candidates = fusedResults.slice(0, 15);


  // ......
  //  Reranker
  //  ........

  //  const rerankedResults = await rerankResults(
  //   question,
  //   candidates,
  //   5
  // );

  const rerankedResults = await rerankResults(
  standaloneQuestion,
  candidates,
  5
);

  console.log(
  "Reranked results BEFORE threshold:",
  rerankedResults.map((result) => ({
    chunkIndex: result.chunkIndex,
    rerankScore: result.rerankScore,
    rrfScore: result.rrfScore,
    source: result.source,
    content: result.content?.slice(0, 500),
  }))
);

  // .... Add min thrushold instead of giving top 5 will give thrushold result...

   const minRerankScore = 0.30;

  //  .... Relebvant Result .......

  const relevantResults = rerankedResults.filter((result) => 
    result.rerankScore !== undefined && 
    result.rerankScore  >= minRerankScore
);




if (relevantResults.length === 0) {
  return {
    answer:
      "I couldn't find relevant information in the Bhagavad Gita.",
    sources: [],
  };
}
 
 console.log("REranked scores:", 
  rerankedResults.map((result) => ({
    
    chunkIndex: result.chunkIndex,
    rerankScore: result.rerankScore,
  }))
 );


  const finalResults =
    relevantResults.slice(0, 5);

  console.log(
    "\nFINAL CONTEXT:"
  );

  console.log(
    finalResults.map((result) => ({
      chunkIndex: result.chunkIndex,
      rerankScore: result.rerankScore,
      source: result.source,
      content:
        result.content?.slice(0, 1000),
    }))
  );

  



  console.log("Total retrieved:", relevantResults.length);

  // 3. Extract relevant content
  // const context = relevantResults
    const context = finalResults
    .map((result) => result.content)
    .filter(
      (content): content is string =>
        typeof content === "string"
    )
    .join("\n\n");

  // 4. Send context + question to LLM
  console.log("Generating answer...");

  // const answer = await generateAnswer(
  //   question,
  //   context
  // );

  const answer = await generateAnswer(
  standaloneQuestion,
  context,
  chatHistory
);

  //  const sources = filterResult.map((result) => ({
  //       score: result.score,
  //       chunkIndex: result.payload?.chunkIndex,
  //       documentName: result.payload?.documentName,
  //   }));

  //  reranler prepare sources

   const sources = finalResults.map(
        (result) => ({
            qdrantScore: result.qdrantScore,
            bm25Score: result.bm25Score,
            rerankScore: result.rerankScore,
            chunkIndex:result.chunkIndex,
            documentName:result.documentName,   
            source: result.source,
            rrfScore: result.rrfScore,
        })
        
    );

  return {
    answer,
    sources,
  };
};

// Query rewriting
const rewriteQuery = async (
  question: string,
  chatHistory: string
): Promise<string> => {

  if (!chatHistory) {
    return question;
  }

  const prompt = `
Convert the user's latest question into a clear standalone question.

Use the conversation history to understand references such as:
"it", "that", "this", "he", "tell me more".

Conversation:
${chatHistory}

Latest question:
${question}

Return ONLY the rewritten standalone question.
`;

  return await generateAnswer(
    question,
    prompt
  );
};