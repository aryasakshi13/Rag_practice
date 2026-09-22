import type { Request, Response } from "express";
import { runEvaluation } from "../evaluation/evaluationQuestions.js";

export async function evaluationApi(
  req: Request,
  res: Response
) {
  try {
    const results = await runEvaluation();

    return res.status(200).json({
      success: true,
      totalQuestions: results.length,
      results,
    });

  } catch (error) {
    console.error("Evaluation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Evaluation failed",
    });
  }
}