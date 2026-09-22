

import fs from "fs";
import pdf from "pdf-parse";

export async function extractTextFromPDF(filePath: string): Promise<string> {
// const pdfBuffer = fs.readFileSync("./data/Bhagavad-gita.pdf");
    const pdfBuffer = fs.readFileSync(filePath);
    const result = await pdf(pdfBuffer);
    return result.text;

}

