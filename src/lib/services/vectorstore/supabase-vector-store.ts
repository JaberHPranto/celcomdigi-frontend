import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  BaseVectorStore,
  VectorDocument,
  SearchResult,
  HybridSearchResult,
  HybridSearchOptions,
} from "./BaseVectorStore";

/**
 * Category keywords mapping for intent detection.
 */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  prepaid: [
    "prepaid",
    "pre-paid",
    "speedstream",
    "nx",
    "uv",
    "one time pass",
    "otp",
  ],
  postpaid: [
    "postpaid",
    "post-paid",
    "one pro",
    "one ultra",
    "signature",
    "family",
    "gadgetsim",
    "watchsim",
  ],
  fibre: ["fibre", "fiber", "fttr", "home wifi", "home internet", "broadband"],
  roaming: ["roaming", "travel", "overseas", "abroad", "international"],
  devices: ["phone", "device", "iphone", "samsung", "android", "tablet"],
};

/**
 * Product identifiers for strong metadata matching.
 */
const PRODUCT_IDENTIFIERS = [
  "uv",
  "nx",
  "speedstream",
  "one pro",
  "one ultra",
  "signature",
  "family",
  "fttr",
];

/**
 * Stop words to filter from query terms.
 */
const STOP_WORDS = [
  "the",
  "and",
  "for",
  "with",
  "tell",
  "about",
  "can",
  "you",
  "me",
];

/**
 * Supabase vector store for storing and retrieving document embeddings.
 */
export class SupabaseVectorStore extends BaseVectorStore {
  private client: SupabaseClient;
  private tableName: string;

  constructor(url: string, key: string, tableName: string = "documents") {
    super();
    if (!url || !key) {
      throw new Error("Supabase URL and Key are required");
    }
    this.client = createClient(url, key);
    this.tableName = tableName;
  }

  /**
   * Add documents to the Supabase vector store.
   */
  async addDocuments(documents: VectorDocument[]): Promise<void> {
    const { error } = await this.client.from(this.tableName).upsert(documents);

    if (error) {
      console.error("Error adding documents to Supabase:", error);
      throw new Error(`Supabase Error: ${error.message}`);
    }
  }

  /**
   * Clear all documents from the vector store.
   */
  async clearAll(): Promise<void> {
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .neq("id", 0); // Delete all rows (neq 0 matches everything)

    if (error) {
      console.error("Error clearing documents from Supabase:", error);
      throw new Error(`Supabase Clear Error: ${error.message}`);
    }

    console.log("✓ Cleared all existing documents from vector store");
  }

  /**
   * Extract category/intent from query text.
   */
  extractQueryIntent(query: string): string | null {
    const queryLower = query.toLowerCase();

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      if (keywords.some((kw) => queryLower.includes(kw))) {
        return category;
      }
    }

    return null;
  }

  /**
   * Hybrid search: Category filtering + semantic search + keyword boost.
   */
  async hybridSearch(
    vector: number[],
    query: string,
    k: number = 5,
    options: HybridSearchOptions = {}
  ): Promise<HybridSearchResult[]> {
    const {
      categoryFilter = null,
      minSimilarity = 0.3,
      keywordBoost = 0.15,
      preferOverview = true,
    } = options;

    // Extract intent if not provided
    const detectedCategory = categoryFilter || this.extractQueryIntent(query);

    // Get more results for reranking
    const expandedK = Math.max(k * 10, 50); // Fetch at least 50 candidates

    const { data, error } = await this.client.rpc("match_documents", {
      query_embedding: vector,
      match_threshold: 0.1, // Very low threshold to catch everything
      match_count: expandedK,
    });

    if (error) {
      throw new Error(`Similarity search failed: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Filter by category if detected
    let filteredData = data as SearchResult[];
    if (detectedCategory) {
      const categoryFiltered = filteredData.filter(
        (doc) => doc.metadata?.category === detectedCategory
      );

      // Fallback if no results with category filter
      if (categoryFiltered.length === 0) {
        console.log(
          `No results for category "${detectedCategory}", using all results`
        );
      } else {
        filteredData = categoryFiltered;
      }
    }

    // Keyword-based reranking
    const queryTerms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 1 && !STOP_WORDS.includes(t));

    // Specific product identifiers that should trigger strong metadata matching
    const activeProductFilters = PRODUCT_IDENTIFIERS.filter((id) =>
      query.toLowerCase().includes(id)
    );

    const reranked: HybridSearchResult[] = filteredData.map((doc) => {
      let boost = 0;
      const contentLower = doc.content.toLowerCase();
      const headerLower = (doc.metadata?.sectionHeader || "").toLowerCase();
      const urlLower = (doc.metadata?.url || "").toLowerCase();
      const chunkType = doc.metadata?.chunkType || "";

      // CRITICAL: Metadata/URL matching for specific products
      // If query asks for "UV" and URL contains "/uv", give massive boost
      // AND penalize others
      let isProductMatch = false;

      if (activeProductFilters.length > 0) {
        activeProductFilters.forEach((prodId) => {
          // Check URL for strict product match (e.g. /prepaid/uv)
          if (
            urlLower.includes(`/${prodId.replace(" ", "-")}`) ||
            urlLower.includes(`/${prodId.replace(" ", "")}`) ||
            urlLower.endsWith(`/${prodId}`) ||
            headerLower.includes(prodId)
          ) {
            boost += 10.0; // Massive boost to override everything else
            isProductMatch = true;
          }
        });

        // If we are looking for a specific product and this chunk ISN'T it, penalize it
        if (!isProductMatch) {
          boost -= 0.5;
        }
      }

      // Boost for query terms in headers (more important)
      queryTerms.forEach((term) => {
        if (headerLower.includes(term)) boost += keywordBoost * 2;
        if (contentLower.includes(term)) boost += keywordBoost;
      });

      // Prefer overview chunks for general queries
      if (preferOverview && chunkType === "overview") {
        boost += 0.05;
      }

      // Penalize FAQ-only chunks unless query is asking a question
      if (
        chunkType === "faq" &&
        !query.toLowerCase().match(/\b(how|what|when|where|why|can|is|are)\b/)
      ) {
        boost -= 0.1;
      }

      return {
        ...doc,
        similarity: doc.similarity + boost, // Allow going above 1.0 for sorting
        originalSimilarity: doc.similarity,
        boost: boost,
      };
    });

    // Sort and return top K
    return reranked.sort((a, b) => b.similarity - a.similarity).slice(0, k);
  }

  /**
   * Search for similar documents using vector similarity.
   * Uses the 'match_documents' RPC function in Supabase.
   */
  async similaritySearch(
    vector: number[],
    k: number = 5,
    filter: Record<string, unknown> = {}
  ): Promise<SearchResult[]> {
    const matchThreshold = 0.3; // Lower threshold for more candidates

    // Call the RPC function 'match_documents'
    const { data, error } = await this.client.rpc("match_documents", {
      query_embedding: vector,
      match_threshold: matchThreshold,
      match_count: k,
    });

    if (error) {
      console.error("Error searching Supabase:", error);
      throw new Error(`Supabase Search Error: ${error.message}`);
    }

    return data as SearchResult[];
  }
}
