import { getDocument } from "@/lib/documentStore";

export const runtime = "nodejs";

export async function GET() {
  const doc = getDocument();

  if (!doc) {
    return new Response(
      JSON.stringify({ error: "No document loaded" }),
      { status: 404 }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      meta: doc.meta,
      textLength: doc.text.length,
      preview: doc.text.slice(0, 500),
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
