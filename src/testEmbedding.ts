import { generateEmbeding } from "./embed.js";

async function testEmbedding(){
    const text = "Karishna Explain Karma Yoga to Arjun.";
    const embedding = await generateEmbeding(text);
    
    console.log("Embedding generated successfully");
    console.log("Vector length :", embedding.length);
    console.log("first 10 values:", embedding.slice(0, 10));
}

testEmbedding();