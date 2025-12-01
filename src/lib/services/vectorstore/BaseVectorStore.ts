/**
 * Document interface for vector store operations.
 */
export interface VectorDocument {
    content: string;
    metadata: Record<string, any>;
    embedding: number[];
}

/**
 * Search result interface.
 */
export interface SearchResult {
    content: string;
    metadata: Record<string, any>;
    similarity: number;
}

/**
 * Abstract base class for vector stores.
 * Defines the interface for vector database operations.
 */
export abstract class BaseVectorStore {
    /**
     * Add documents to the vector store.
     * @param documents - Array of documents with content, metadata, and embeddings
     */
    abstract addDocuments(documents: VectorDocument[]): Promise<void>;

    /**
     * Search for similar documents using vector similarity.
     * @param vector - Query embedding vector
     * @param k - Number of results to return
     * @param filter - Optional metadata filter
     * @returns Promise resolving to array of search results
     */
    abstract similaritySearch(
        vector: number[],
        k?: number,
        filter?: Record<string, any>
    ): Promise<SearchResult[]>;
}
