import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  BaseVectorStore,
  VectorDocument,
  SearchResult,
} from "./BaseVectorStore";

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
   * Search for similar documents using vector similarity.
   * Uses the 'match_documents' RPC function in Supabase.
   */
  async similaritySearch(
    vector: number[],
    k: number = 5,
    filter: Record<string, any> = {}
  ): Promise<SearchResult[]> {
    const matchThreshold = 0.5; // Adjustable threshold

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
