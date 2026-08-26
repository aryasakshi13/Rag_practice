
import { extractTextFromPDF } from "./extract.js";
import {chunkText} from "./chunk.js";
async function main() {
    const text = await extractTextFromPDF("./data/Bhagavad-gita.pdf");
    const chunks = chunkText(text, 500);
    console.log(chunks.length);

    console.log(chunks[0]);

}

main();

