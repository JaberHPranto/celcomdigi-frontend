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
 * Extended search result with reranking information.
 */
export interface HybridSearchResult extends SearchResult {
  originalSimilarity: number;
  boost: number;
}

/**
 * Options for hybrid search.
 */
export interface HybridSearchOptions {
  categoryFilter?: string | null;
  minSimilarity?: number;
  keywordBoost?: number;
  preferOverview?: boolean;
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

  /**
   * Hybrid search combining category filtering, semantic search, and keyword boosting.
   * @param vector - Query embedding vector
   * @param query - Original query text for keyword matching
   * @param k - Number of results to return
   * @param options - Hybrid search options
   * @returns Promise resolving to array of reranked search results
   */
  abstract hybridSearch(
    vector: number[],
    query: string,
    k?: number,
    options?: HybridSearchOptions
  ): Promise<HybridSearchResult[]>;
}
