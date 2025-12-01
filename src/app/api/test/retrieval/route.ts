import { NextResponse } from "next/server";
import { GeminiEmbeddingService } from "@/lib/services/embedding/gemini-embedding-service";
import { SupabaseVectorStore } from "@/lib/services/vectorstore/supabase-vector-store";
import { markdownToPlainText } from "@/lib/utils/markdown-utils";
import { writeFile } from "fs/promises";
import path from "path";

/**
 * GET /api/test/retrieval
 *
 * Test endpoint that runs predefined queries to verify the RAG system.
 * Saves results to a JSON file for comparison with the original Node.js implementation.
 */
export async function GET() {
  console.log("Testing retrieval...\n");

  try {
    // Initialize services
    const embeddingService = new GeminiEmbeddingService(
      process.env.GEMINI_API_KEY!
    );
    const vectorStore = new SupabaseVectorStore(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );

    // Test queries (same as original Node.js script)
    const queries = [
      "What is prepaid datasim plan available?",
      "What 5G plans are available?",
      "How much does roaming cost?",
      "What safety features does CelcomDigi offer?",
    ];

    const allResults = [];

    for (const query of queries) {
      console.log(`\n📝 Query: "${query}"`);
      console.log("─".repeat(60));

      try {
        // Generate query embedding
        const queryEmbedding = await embeddingService.embedQuery(query);

        // Search for similar documents
        const results = await vectorStore.similaritySearch(queryEmbedding, 3);

        if (results.length === 0) {
          console.log("No results found.");
        } else {
          const queryResults = {
            query: query,
            results: [] as any[],
          };

          results.forEach((result, idx) => {
            // Checkmark for successful retrieval
            console.log(`\n${idx + 1}. Successfully retrieval ✅`);
            console.log(`   Content: ${result.content.substring(0, 150)}...`);

            queryResults.results.push({
              rank: idx + 1,
              similarity: result.similarity,
              category: result.metadata.category,
              url: result.metadata.url,
              contentMarkdown: result.content,
              contentPlainText: markdownToPlainText(result.content),
            });
          });

          allResults.push(queryResults);
        }
      } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : error);
      }
    }

    // Write results to file in the project root
    const outputPath = path.join(process.cwd(), "test-retrieval-results.json");
    await writeFile(outputPath, JSON.stringify(allResults, null, 2));
    console.log(`\n📄 Results saved to: ${outputPath}`);

    console.log("\n✅ Retrieval test complete!");

    return NextResponse.json({
      success: true,
      message: "Retrieval test complete",
      resultsFile: outputPath,
      results: allResults,
    });
  } catch (error) {
    console.error("Error in test retrieval:", error);
    return NextResponse.json(
      {
        error: "Failed to run retrieval test",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
