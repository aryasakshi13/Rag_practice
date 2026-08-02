
import { extractTextFromPDF } from "./extract.js";
import {chunkText} from "./chunk.js";
async function main() {
    const text = await extractTextFromPDF("./data/Bhagavad-gita.pdf");

    console.log(text);
}

main();

