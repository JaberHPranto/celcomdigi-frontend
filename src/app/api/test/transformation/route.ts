import { NextRequest, NextResponse } from "next/server";
import { GeminiEmbeddingService } from "@/lib/services/embedding/gemini-embedding-service";
import { SupabaseVectorStore } from "@/lib/services/vectorstore/supabase-vector-store";
import { AITransformerService } from "@/lib/services/ai-transformer";
import { markdownToPlainText } from "@/lib/utils/markdown-utils";

/**
 * POST /api/test/transformation
 *
 * Test endpoint for AI transformation layer
 * Similar to your Node.js test script
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      queries = [
        "Can you tell me about prepaid 5g uv plan?",
        "Can you tell me about speedstream plan?",
      ],
    } = body;

    console.log("Testing retrieval with AI transformation layer...\n");

    // Initialize services
    const embeddingService = new GeminiEmbeddingService(
      process.env.GEMINI_API_KEY!
    );
    const vectorStore = new SupabaseVectorStore(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
    const aiTransformer = new AITransformerService(
      process.env.GEMINI_FLASH_API_KEY || process.env.GEMINI_API_KEY!
    );

    const allResults = [];

    for (const query of queries) {
      console.log(`\n${"=".repeat(70)}`);
      console.log(`📝 Query: "${query}"`);
      console.log("=".repeat(70));

      try {
        // Generate query embedding
        const queryEmbedding = await embeddingService.embedQuery(query);

        // Search for similar documents using hybrid search
        const results = await vectorStore.hybridSearch(
          queryEmbedding,
          query,
          1
        );

        if (results.length === 0) {
          console.log("No results found.");
          allResults.push({
            query,
            error: "No results found",
          });
        } else {
          const result = results[0];

          console.log("🗿 Retrieved content from database ... \n");
          console.log(
            "Match: " +
              (result?.similarity
                ? `${(result.similarity * 100).toFixed(2)}%`
                : `No match found`)
          );

          // Transform with AI
          console.log("🤖 Generating human-friendly answer...\n");
          const transformation = await aiTransformer.transform(
            query,
            result.content,
            {
              url: result.metadata.url,
              category: result.metadata.category,
            }
          );

          console.log("--- ✨ AI-TRANSFORMED ANSWER ---");
          console.log(transformation.humanFriendlyAnswer);
          console.log("---\n");

          allResults.push({
            query: query,
            source: result.metadata.url,
            category: result.metadata.category,
            similarity: result.similarity,
            rawContent: markdownToPlainText(result.content).substring(0, 500),
            aiAnswer: transformation.humanFriendlyAnswer,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        allResults.push({
          query,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    console.log("\n✅ Transformation test complete!");

    return NextResponse.json({
      message: "Test complete",
      results: allResults,
    });
  } catch (error) {
    console.error("Error in transformation test:", error);
    return NextResponse.json(
      {
        error: "Test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
