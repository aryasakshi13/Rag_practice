import { evaluationQuestions } from "./evaluationQuestions.js";
import { generateBaselineAnswer } from "../llm/generateBaselineAnswer.js";
import { askQuestion } from "../rag.js";
import { initializeBM25 } from "../Bm25/initializeBM25.js";
export interface EvaluationResult {
  id: number;
  question: string;
  category: "relevant" | "out-of-document";
  expectedAnswer: string;
  baselineAnswer: string;
  ragAnswer: string;
}

export const runEvaluation = async (): Promise<EvaluationResult[]> => {
  
  const results: EvaluationResult[] = [];

  console.log("initialize BM25");
  await initializeBM25();
  console.log("BM25 initialized");


  for (const item of evaluationQuestions) {

    console.log("\n=================================");
    console.log(`Question ${item.id}: ${item.question}`);
    console.log("=================================");

    console.log(" Generating baseline answer...");

    const baselineAnswer =
      await generateBaselineAnswer(item.question);

    console.log("Generating RAG answer...");

    const ragResult =
      await askQuestion(item.question);

    results.push({
      id: item.id,
      question: item.question,
      category: item.category,
      expectedAnswer: item.expectedAnswer,
      baselineAnswer,
      ragAnswer: ragResult.answer,
    });

    console.log("\nBASELINE:");
    console.log(baselineAnswer);

    console.log("\nRAG:");
    console.log(ragResult.answer);

    console.log("\nEXPECTED:");
    console.log(item.expectedAnswer);
  }

  return results;
};