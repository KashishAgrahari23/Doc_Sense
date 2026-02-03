import { getVectorStore } from "@/lib/vectorStore";
import { askGroq } from "@/lib/groq";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question || !question.trim()) {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400 }
      );
    }

    // 1️⃣ Get Chroma vector store
    const vectorStore = await getVectorStore();

    // 2️⃣ Semantic search
    const results = await vectorStore.similaritySearch(question, 4);

    if (!results.length) {
      return new Response(
        JSON.stringify({ error: "No documents indexed yet" }),
        { status: 400 }
      );
    }

    // 3️⃣ Combine context
    const context = results
      .map((doc, i) => `Chunk ${i + 1}:\n${doc.pageContent}`)
      .join("\n\n");

    // 4️⃣ Ask Groq
    const answer = await askGroq(context, question);

    return new Response(
      JSON.stringify({
        success: true,
        answer,
        sources: results.map((doc, i) => ({
          chunkIndex: i,
          preview: doc.pageContent.slice(0, 200),
        })),
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("CHAT ERROR:", err);

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
