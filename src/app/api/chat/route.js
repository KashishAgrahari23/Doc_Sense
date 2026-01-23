import { getDocument } from "@/lib/documentStore";
import { findRelevantChunk } from "@/lib/findRelevantChunk";
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

    const doc = getDocument();

    if (!doc) {
      return new Response(
        JSON.stringify({ error: "No document uploaded" }),
        { status: 400 }
      );
    }
    const {chunk , index} = findRelevantChunk(chunks,question)
    const answer = await askGroq(chunk, question);

    return new Response(
  JSON.stringify({
    success: true,
    answer,
    source: {
      chunkIndex: index,
      preview: chunk.slice(0, 300),
    },
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
