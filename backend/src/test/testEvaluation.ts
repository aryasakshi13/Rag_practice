import dotenv from "dotenv";
import { runEvaluation } from "../evaluation/evaluationQuestions.js";


// The dotenv.config() function is a core method provided by the dotenv npm package that reads key-value pairs from a .env file, parses them, and injects them directly into the Node.js process.env object. T
dotenv.config();

console.log("Rag vs Baseline Evaluation");

try{
    const results = await runEvaluation();

    console.log("finale evalutaion results");

    for(const result of results){
        console.log(`Question ${result.id}`);
        console.log(`Category ${result.category}`);
        

            console.log("\nQuestion:");
            console.log(result.question);

            console.log("\nExpected Answer:");
            console.log(result.expectedAnswer);

            console.log("\nBaseline LLM Answer:");
            console.log(result.baselineAnswer);

            console.log("\nRAG Answer:");
            console.log(result.ragAnswer);
    }


}catch(error){
    console.log("\n Evaluation failed");
    console.log(error);
}