import type { Response, Request } from "express";
import { askQuestion } from "../rag.js";

export  async function ragApi(req:Request, res:Response){

    try{
         const {question } = req.body;

         if(!question || typeof question !== "string"){
            return res.status(400).json({
                success: false ,
                message : "Question is required"
            })
         }

         const result = await askQuestion(question)

          return res.status(200).json({
            success: true,
            question,
            answer: result.answer,
            sources: result.sources
        });

    } catch(error){
        console.error("RAG Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate answer"
        });
    
    }

};