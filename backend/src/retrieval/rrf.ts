// export interface FusionDocument {
//   content: string;
//   documentName: string;
//   chunkIndex: number;
//   qdrantScore: number | undefined;
//   bm25Score: number | undefined;
//   source: "dense" | "bm25" | "both";
// }

// export interface FusedDocument extends FusionDocument {
//   rrfScore: number;
// }

export interface FusionDocument {
  content: string;
  documentName: string;
  chunkIndex: number;
  qdrantScore: number | undefined;
  bm25Score: number | undefined;
  source: "dense" | "bm25";
}

export interface FusedDocument {
  content: string;
  documentName: string;
  chunkIndex: number;

  qdrantScore: number | undefined;
  bm25Score: number | undefined;

  source: "dense" | "bm25" | "both";

  rrfScore: number;
}

export const reciprocalRankFusion = (
  denseResults: FusionDocument[],
  bm25Results: FusionDocument[],
  k: number = 60
): FusedDocument[] => {

  const documentMap = new Map<string, FusedDocument>();

  // -------------------------
  // Dense results
  // -------------------------

  denseResults.forEach((doc, index) => {

    const key = `${doc.documentName}-${doc.chunkIndex}`;

    const rank = index + 1;

    const rrfScore = 1 / (k + rank);

    const existing = documentMap.get(key);

    if (existing) {

      existing.rrfScore += rrfScore;

      existing.source = "both";

    } else {

      documentMap.set(key, {
        content: doc.content,
        documentName: doc.documentName,
        chunkIndex: doc.chunkIndex,

        qdrantScore: doc.qdrantScore,

        bm25Score: undefined,

        source: "dense",

        rrfScore
      });

    }
  });


  // -------------------------
  // BM25 results
  // -------------------------

  bm25Results.forEach((doc, index) => {

    const key = `${doc.documentName}-${doc.chunkIndex}`;

    const rank = index + 1;

    const rrfScore = 1 / (k + rank);

    const existing = documentMap.get(key);

    if (existing) {

      existing.rrfScore += rrfScore;

      existing.source = "both";

      existing.bm25Score = doc.bm25Score;

    } else {

      documentMap.set(key, {

        content: doc.content,
        documentName: doc.documentName,
        chunkIndex: doc.chunkIndex,

        qdrantScore: undefined,

        bm25Score: doc.bm25Score,

        source: "bm25",

        rrfScore

      });

    }
  });


  // -------------------------
  // Sort by RRF score
  // -------------------------

  const results = Array.from(
    documentMap.values()
  );

  return results.sort(
    (a, b) => b.rrfScore - a.rrfScore
  );
};