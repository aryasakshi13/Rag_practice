// export interface Chunk {
//     id: number;
//     text: string;
// }
// export function chunkText(text: string, chunkSize: number): Chunk[]{
    
//     const chunks: Chunk[] = [];
//         let id = 0;

//     for(let i =0; i<text.length; i += chunkSize){
//         chunks.push({
//             id:id,
//             text:text.slice(i, i + chunkSize)}
//         );
//     }
//     return chunks;
// }


export function chunkText(text: string, chunkSize = 500, overlap = 50): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let start = 0;
  while (start < words.length) {
    chunks.push(words.slice(start, start + chunkSize).join(" "));
    start += chunkSize - overlap;
  }
  return chunks;
}