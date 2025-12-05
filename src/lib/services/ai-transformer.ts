import { GoogleGenerativeAI } from "@google/generative-ai";

export interface TransformationMetadata {
  url: string;
  category: string;
  sectionIds?: string[];
}

export interface TransformationResult {
  humanFriendlyAnswer: string;
  source: string;
  targetUrl: string;
  bestSection: string | null;
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
   * @param metadata - Source URL, category, and section IDs information
   * @returns Human-friendly answer with source information and targeted section URL
   */
  async transform(
    query: string,
    retrievedContent: string,
    metadata: TransformationMetadata
  ): Promise<TransformationResult> {
    const sectionIds = metadata.sectionIds || [];
    const sectionIdsList =
      sectionIds.length > 0
        ? sectionIds.map((id) => `- ${id}`).join("\n")
        : "(none available)";

    const prompt = `You are a helpful customer service assistant for CelcomDigi, a Malaysian telecommunications company.

A user asked: "${query}"

Here is the retrieved content from our knowledge base:

---
${retrievedContent}
---

Source URL: ${metadata.url}
Category: ${metadata.category}

Available page sections (anchor IDs):
${sectionIdsList}

Your task:
1. Analyze if the retrieved content is relevant to the user's question
2. Extract and present relevant information in a clear, conversational way
3. If specific details are missing, say so, but try to be helpful with what's available
4. Maintain a friendly, professional tone
5. Keep your response concise but informative

IMPORTANT: You must respond in valid JSON format with exactly these two fields:
{
  "answer": "Your helpful response here...",
  "best_section": "the_most_relevant_section_id_or_null"
}

For "best_section", pick the MOST RELEVANT section ID from the available list that matches the user's question intent:
- If asking about pricing/plans → prefer "plans" or "pricing"
- If asking about benefits/features → prefer "benefits"
- If asking FAQ/how-to questions → prefer "faq"
- If asking about roaming → prefer "roaming-passes" or similar
- If asking questions about specific products, use the section ID that best matches
- If no section is relevant or none available, use null

Respond ONLY with the JSON object, no additional text:`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const responseText = response.text();

      // Parse the JSON response
      const cleanedResponse = responseText
        .replace(/```json\n?|\n?```/g, "")
        .trim();
      const parsed = JSON.parse(cleanedResponse);

      // Build the final URL with section anchor if available
      let targetUrl = metadata.url;
      if (parsed.best_section && sectionIds.includes(parsed.best_section)) {
        targetUrl = `${metadata.url}#${parsed.best_section}`;
      }

      return {
        humanFriendlyAnswer: parsed.answer,
        source: metadata.url,
        targetUrl: targetUrl,
        bestSection: parsed.best_section || null,
        category: metadata.category,
      };
    } catch (error) {
      console.error("Error generating AI response:", error);
      return {
        humanFriendlyAnswer:
          "Sorry, I encountered an error processing this information.",
        source: metadata.url,
        targetUrl: metadata.url,
        bestSection: null,
        category: metadata.category,
      };
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
