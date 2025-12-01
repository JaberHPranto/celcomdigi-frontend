import { NextRequest, NextResponse } from "next/server";
import { GeminiEmbeddingService } from "@/lib/services/embedding/gemini-embedding-service";
import { SupabaseVectorStore } from "@/lib/services/vectorstore/supabase-vector-store";
import { markdownToPlainText } from "@/lib/utils/markdown-utils";

/**
 * POST /api/chat/retrieval
 *
 * Retrieves relevant documents based on a query using RAG.
 *
 * Request body:
 * {
 *   "query": "What is prepaid datasim plan available?",
 *   "k": 5 // optional, defaults to 5
 * }
 *
 * Response:
 * {
 *   "query": "...",
 *   "results": [
 *     {
 *       "rank": 1,
 *       "similarity": 0.85,
 *       "category": "prepaid",
 *       "url": "https://...",
 *       "contentMarkdown": "...",
 *       "contentPlainText": "..."
 *     }
 *   ]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { query, k = 5 } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required and must be a string" },
        { status: 400 }
      );
    }

    // Initialize services
    const embeddingService = new GeminiEmbeddingService(
      process.env.GEMINI_API_KEY!
    );
    const vectorStore = new SupabaseVectorStore(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );

    // Generate query embedding
    const queryEmbedding = await embeddingService.embedQuery(query);

    // Search for similar documents
    const results = await vectorStore.similaritySearch(queryEmbedding, k);

    // Format results
    const formattedResults = results.map((result, idx) => ({
      rank: idx + 1,
      similarity: result.similarity,
      category: result.metadata.category,
      url: result.metadata.url,
      contentMarkdown: result.content,
      contentPlainText: markdownToPlainText(result.content),
    }));

    return NextResponse.json({
      query,
      results: formattedResults,
    });
  } catch (error) {
    console.error("Error in retrieval API:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve documents",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
