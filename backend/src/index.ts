
import { extractTextFromPDF } from "./extract.js";
import {chunkText} from "./chunk.js";
import { generateEmbeding } from "./embed.js";
import { upsertChunk } from "./vector/upsertChunks.js";

// async function main() {
//     const text = await extractTextFromPDF("./data/Bhagavad-gita.pdf");
//     const chunks = chunkText(text, 500);
//     console.log(chunks.length);

//     console.log(chunks[0]);

// }

const main = async () => {
    const pdfPath = "./data/Bhagavad-gita.pdf"

    console.log("Reading PDF...");

    const text = await extractTextFromPDF(pdfPath);

    console.log(`Extracted characters: ${text.length}`);

    console.log("Creating chunks...");

    const chunks = chunkText(text);

    console.log(`Total chunks: ${chunks.length}`);

    for(let i = 0; i<chunks.length; i++){

        const content = chunks[i];

        
          if (!content) {
                continue;
          }
        
        console.log(
          `\nProcessing chunk ${i+ 1}/${chunks.length}`
        );

         const embedding = await generateEmbeding(
            content
        );

            console.log(
              `Embedding size: ${embedding.length}`
            );

    await upsertChunk({
      id: i + 1,
      content: content,
      embedding : embedding,
      documentName: "bhagavad-gita.pdf",
      chunkIndex: i,
    });
    }

    console.log("\nPDF successfully stored in Qdrant!");
}


main().catch(console.error);

