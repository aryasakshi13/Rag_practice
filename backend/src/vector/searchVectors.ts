import qdrant from "../config/quadrant.js";

const COLLECTION_NAME = "document_chunks";

export const searchVectors = async(
    queryEmbedding: number[],
    limit: number = 5
) => {
     if (queryEmbedding.length !== 1024) {
        throw new Error(
        `Expected query embedding of 1024 dimensions, got ${queryEmbedding.length}`
        );
    }

    const results = await qdrant.search(
        COLLECTION_NAME,
        {
            vector: queryEmbedding,
            limit,
            with_payload: true,
        }
    );
     return results ;
}