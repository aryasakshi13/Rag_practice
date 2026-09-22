import qdrant from "../config/quadrant.js";

import {
    buildBm25Index,
    type BM25Document
} from "./bm25Index.js";




const COLLECTION_NAME = "document_chunks";


export const initializeBM25 = async () => {

    console.log(
        "Loading chunks from Qdrant for BM25..."
    );

    const documents: BM25Document[] = [];

    let offset: any = null;


    while (true) {

        const response =
            await qdrant.scroll(
                COLLECTION_NAME,
                {
                    limit: 100,
                    offset,
                    with_payload: true,
                    with_vector: false,
                }
            );


        for (const point of response.points) {

            const payload =
                point.payload;


            if (
                typeof payload?.content !==
                "string"
            ) {
                continue;
            }


            documents.push({

                id: String(point.id),

                content:
                    payload.content,

                documentName:
                    String(
                        payload.documentName ??
                        ""
                    ),

                chunkIndex:
                    Number(
                        payload.chunkIndex ??
                        0
                    ),
            });
        }


        if (
            !response.next_page_offset
        ) {
            break;
        }


        offset =
            response.next_page_offset;
    }


   buildBm25Index(
        documents
    );


    console.log(
        `BM25 initialized with ${documents.length} chunks`
    );
};