import { askQuestion } from "../rag.js";
import {initializeBM25} from "../Bm25/initializeBM25.js";


await initializeBM25();
const questions = [
  // Relevant questions
  "What is Dharma according to Bhagavad Gita?",
  "What does Bhagavad Gita say about the soul?",
  "What does Krishna teach Arjuna about performing his duty?",
  "What is karma according to Bhagavad Gita?",
  "What is yoga according to Krishna?",
   "Why should Arjuna perform his duty?",
  "What happens to the soul after death?",
  "What is the difference between the body and the soul?",
  "Why does Krishna tell Arjuna not to fear death?",
  "What does Krishna say about attachment to the results of actions?",
]

  // Conceptual questions
  // "Why should Arjuna perform his duty?",
  // "What happens to the soul after death?",
  // "What is the difference between the body and the soul?",
  // "Why does Krishna tell Arjuna not to fear death?",
  // "What does Krishna say about attachment to the results of actions?",


//   // Out-of-document questions
//   "What is the capital of France?",
//   "Who invented the telephone?",
//   "What is Python?",
//   "What is the population of India?",
//   "Who is the current president of the United States?"
// ];

for (const question of questions) {

  console.log("\n====================================");
  console.log("QUESTION:", question);
  console.log("====================================");

  try {

    const result = await askQuestion(question);

    console.log("\nANSWER:");
    console.log(result.answer);

    console.log("\nSOURCES:");
    console.log(
      result.sources.map((source) => ({
        chunkIndex: source.chunkIndex,
        rerankScore: source.rerankScore,
        rrfScore: source.rrfScore,
        source: source.source
      }))
    );

  } catch (error) {

    console.error("ERROR:", error);
  }
}

console.log("\n\n========== STAGE 4 TEST ==========");

const chatHistory = [
  {
    role: "user" as const,
    content: "What is Dharma according to Bhagavad Gita?"
  },
  {
    role: "assistant" as const,
    content: "Dharma refers to one's duty and righteous responsibility."
  }
];

try {

  const result = await askQuestion(
    "Tell me more about that.",
    chatHistory
  );

  console.log("\nANSWER:");
  console.log(result.answer);

  console.log("\nSOURCES:");
  console.log(result.sources);

} catch (error) {

  console.error("STAGE 4 ERROR:", error);

}