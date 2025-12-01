import { GoogleGenerativeAI } from "@google/generative-ai";
import { BaseEmbeddingService } from "./BaseEmbeddingService";

/**
 * Gemini embedding service using Google's text-embedding-004 model.
 */
export class GeminiEmbeddingService extends BaseEmbeddingService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    super();
    if (!apiKey) {
      throw new Error("Google Gemini API Key is required");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "text-embedding-004" });
  }

  /**
   * Generate embeddings for multiple documents.
   * Processes each document individually to handle API limitations.
   */
  async embedDocuments(texts: string[]): Promise<number[][]> {
    try {
      const embeddings = await Promise.all(
        texts.map(async (text) => {
          const result = await this.model.embedContent(text);
          return result.embedding.values;
        })
      );
      return embeddings;
    } catch (error) {
      console.error("Error generating embeddings with Gemini:", error);
      throw error;
    }
  }

  /**
   * Generate embedding for a single query.
   */
  async embedQuery(text: string): Promise<number[]> {
    try {
      const result = await this.model.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error("Error generating query embedding with Gemini:", error);
      throw error;
    }
  }
}
