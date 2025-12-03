import { GoogleGenerativeAI } from "@google/generative-ai";

export interface TransformationMetadata {
  url: string;
  category: string;
}

export interface TransformationResult {
  humanFriendlyAnswer: string;
  source: string;
  category: string;
}

/**
 * AITransformerService
 *
 * Uses Google's Gemini AI to transform retrieved markdown content
 * into clear, human-friendly answers.
 */
export class AITransformerService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Gemini API key is required for AI transformation");
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.3, // Lower temperature for more focused, consistent responses

      },
    });
  }

  /**
   * Transform retrieved content into a human-friendly answer
   *
   * @param query - The user's original question
   * @param retrievedContent - Raw markdown content from the knowledge base
   * @param metadata - Source URL and category information
   * @returns Human-friendly answer with source information
   */
  async transform(
    query: string,
    retrievedContent: string,
    metadata: TransformationMetadata
  ): Promise<TransformationResult> {
    const prompt = `You are a helpful customer service assistant for CelcomDigi, a Malaysian telecommunications company.

A user asked: "${query}"

Here is the retrieved content from our knowledge base (it may contain navigation links, footers, and other noise):

---
${retrievedContent}
---

Source: ${metadata.url}
Category: ${metadata.category}

Your task:
1. Extract ONLY the relevant information that answers the user's question
2. Ignore navigation links, footers, copyright text, and other boilerplate
3. Provide a clear, concise, human-friendly answer
4. If the content contains FAQ questions without answers, acknowledge this
5. Keep it brief
6. Maintain a friendly, professional tone

Provide your answer:`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const humanFriendlyAnswer = response.text();

      return {
        humanFriendlyAnswer,
        source: metadata.url,
        category: metadata.category,
      };
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw new Error(
        `AI transformation failed: ${error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Transform multiple results in batch
   *
   * @param query - The user's original question
   * @param results - Array of retrieval results with content and metadata
   * @returns Array of transformation results
   */
  async transformBatch(
    query: string,
    results: Array<{
      content: string;
      metadata: TransformationMetadata;
    }>
  ): Promise<TransformationResult[]> {
    const transformations = results.map((result) =>
      this.transform(query, result.content, result.metadata)
    );

    return Promise.all(transformations);
  }
}
