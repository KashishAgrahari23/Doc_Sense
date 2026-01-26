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
    documents: doc.docs.length,
    chunks: doc.docs.map((d, i) => ({
      index: i,
      content: d.pageContent,
    })),
  }),
  { headers: { "Content-Type": "application/json" } }
);

}
