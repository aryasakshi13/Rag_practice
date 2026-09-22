declare module "wink-bm25-text-search" {
    interface BM25Config {
        fldWeights: Record<string, number>;
    }

    interface BM25 {
        defineConfig(config: BM25Config): void;

        definePrepTasks(
            tasks: Array<(text: string) => any>
        ): void;

        addDoc(
            document: Record<string, any>,
            id: string
        ): void;

        consolidate(): void;

        search(
            query: string,
            limit?: number
        ): any[];
    }

    function BM25(): BM25;

    export default BM25;
}