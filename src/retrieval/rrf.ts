export interface FusionDocument {
  content: string;
  documentName: string;
  chunkIndex: number;
  qdrantScore?: number;
  bm25Score?: number;
  source: "dense" | "bm25";
}

export interface FusedDocument extends FusionDocument {
  rrfScore: number;
}

export const reciprocalRankFusion = (
  denseResults: FusionDocument[],
  bm25Results: FusionDocument[],
  k: number = 60
): FusedDocument[] => {

  const scoreMap = new Map<string, number>();
  const documentMap = new Map<string, FusedDocument>();

  // Dense results
  denseResults.forEach((doc, index) => {

    const key = `${doc.documentName}-${doc.chunkIndex}`;

    const rank = index + 1;

    const score = 1 / (k + rank);

    scoreMap.set(
      key,
      (scoreMap.get(key) || 0) + score
    );

    if (!documentMap.has(key)) {
      documentMap.set(key, {
        ...doc,
        rrfScore: 0
      });
    }
  });


  // BM25 results
  bm25Results.forEach((doc, index) => {

    const key = `${doc.documentName}-${doc.chunkIndex}`;

    const rank = index + 1;

    const score = 1 / (k + rank);

    scoreMap.set(
      key,
      (scoreMap.get(key) || 0) + score
    );

    if (!documentMap.has(key)) {
      documentMap.set(key, {
        ...doc,
        rrfScore: 0
      });
    }
  });


  // Add final RRF scores
  const results = Array.from(documentMap.entries())
    .map(([key, doc]) => ({
      ...doc,
      rrfScore: scoreMap.get(key) || 0
    }));


  // Highest RRF score first
  return results.sort(
    (a, b) => b.rrfScore - a.rrfScore
  );
};