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

  
  const preview = doc.docs
    .slice(0, 2)
    .map(d => d.pageContent)
    .join("\n\n")
    .slice(0, 500);

  return new Response(
    JSON.stringify({
      success: true,
      meta: doc.meta,
      documents: doc.docs.length,
      preview,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
