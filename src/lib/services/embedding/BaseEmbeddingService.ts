/**
 * Abstract base class for embedding services.
 * Defines the interface that all embedding services must implement.
 */
export abstract class BaseEmbeddingService {
    /**
     * Generate embeddings for multiple documents.
     * @param texts - Array of text strings to embed
     * @returns Promise resolving to array of embedding vectors
     */
    abstract embedDocuments(texts: string[]): Promise<number[][]>;

    /**
     * Generate embedding for a single query.
     * @param text - Query text to embed
     * @returns Promise resolving to embedding vector
     */
    abstract embedQuery(text: string): Promise<number[]>;
}
