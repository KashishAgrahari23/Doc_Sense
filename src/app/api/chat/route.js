import { getDocument } from "@/lib/documentStore";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question) {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400 }
      );
    }

    const doc = getDocument();

    if (!doc) {
      return new Response(
        JSON.stringify({ error: "No document loaded" }),
        { status: 400 }
      );
    }

    // 👇 ECHO RESPONSE (NO AI YET)
    const answer = `
You asked:
"${question}"

Document info:
- File: ${doc.meta.name}
- Characters: ${doc.text.length}

(This is a placeholder response)
`;

    return new Response(
      JSON.stringify({
        success: true,
        answer,
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
