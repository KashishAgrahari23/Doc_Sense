import { getVectorStore } from "@/lib/vectorStore";
import { askGroq } from "@/lib/groq";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { question, history = [] } = await req.json();

    if (!question?.trim()) {
      return new Response(JSON.stringify({ error: "Question is required" }), {
        status: 400,
      });
    }

    // 1️⃣ Semantic search
    const vectorStore = await getVectorStore();
    // Build contextual question using memory
    const contextualQuestion = history.length
      ? `
Previous conversation:
${history
  .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
  .join("\n")}

Current question:
${question}
`
      : question;

    // 🔥 Use contextualized question for retrieval
    const results = await vectorStore.similaritySearch(contextualQuestion, 4);

    if (!results.length) {
      return new Response(
        JSON.stringify({ error: "No relevant context found" }),
        { status: 400 },
      );
    }

    // 2️⃣ Build context
    const context = results.map((r) => r.pageContent).join("\n\n");

    // 3️⃣ Build conversation memory
    const conversation = history
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");

    // 4️⃣ Ask LLM
    const answer = await askGroq(
      `
You are an AI assistant. Answer ONLY from the context.

Conversation so far:
${conversation}

Context:
${context}

User question:
${question}
`,
    );

    return new Response(JSON.stringify({ success: true, answer }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("CHAT ERROR:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
