import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function testGroq() {
  try {
    const models = await groq.models.list();

    console.log("Available Groq models:");

    for (const model of models.data) {
      console.log(model.id);
    }
  } catch (error) {
    console.error("Groq error:", error);
  }
}

testGroq();