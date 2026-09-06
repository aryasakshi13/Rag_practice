import BM25 from "wink-bm25-text-search";


export interface BM25Document {
    id: string;
    content: string;
    chunkIndex: number;
    documentName: string;
}


const bm25 = BM25();

const documentMap = new Map<string, BM25Document>();

let isInitialized = false;


/*
 * Build BM25 index
 */
export const buildBm25Index = (
    inputDocuments: BM25Document[]
) => {

    if (isInitialized) {
        return;
    }

    bm25.defineConfig({
        fldWeights: {
            content: 1
        }
    });


    bm25.definePrepTasks([
        (text: string) =>
            text.toLowerCase(),

        (text: string) =>
            text.split(/\s+/),
    ]);


    inputDocuments.forEach((doc) => {

        documentMap.set(
            doc.id,
            doc
        );


        bm25.addDoc(
            {
                content: doc.content,
            },
            doc.id
        );

    });


    bm25.consolidate();

    isInitialized = true;


    console.log(
        `BM25 index created with ${inputDocuments.length} documents`
    );
};


/*
 * Search BM25 index
 */
export const searchBM25 = (
    query: string,
    limit: number = 10
) => {

    if (!isInitialized) {

        throw new Error(
            "BM25 index is not initialized. Please call buildBm25Index first."
        );

    }


    const results =
        bm25.search(
            query,
            limit
        );


    return results

        .map((result: any) => {

            /*
             * BM25 result contains the
             * document ID and score.
             */

            const documentId =
                String(
                    result[0] ??
                    result.id
                );


            const document =
                documentMap.get(
                    documentId
                );


            if (!document) {
                return null;
            }


            return {

                ...document,

                bm25Score:
                    Number(
                        result[1] ??
                        result.score ??
                        0
                    ),

            };

        })

        .filter(
            (
                result
            ): result is BM25Document & {
                bm25Score: number;
            } => result !== null
        );

};