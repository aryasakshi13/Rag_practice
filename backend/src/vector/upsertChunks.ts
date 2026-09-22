import qdrant from "../config/quadrant.js";

const COLLECTION_NAME = 'document_chunks';

interface ChunkData {
    id: number;
    content:string;
    embedding: number[];
    documentName: string;
    chunkIndex :number;

} 

export const upsertChunk = async ({
    id,
    content,
    embedding,
    documentName,
    chunkIndex,

 }: ChunkData) =>{
    if(embedding.length !== 1024){
        throw new Error(
            `Expected 1024 dimensions, got${embedding.length}`
        );
    }

 

 await qdrant.upsert(COLLECTION_NAME,{
    wait: true,

    points: [
        {
            id, 

            vector: embedding,

            payload:{
                content,
                documentName,
                chunkIndex,
            },
        },
    ],
 });

 console.log(`Stored chunk ${chunkIndex}`);
};