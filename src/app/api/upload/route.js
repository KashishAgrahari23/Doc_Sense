import { loadDocument } from "@/lib/loadDocument";
import { setDocument } from "@/lib/documentStore";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file uploaded" }),
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const docs = await loadDocument(
      buffer,
      file.type,
      file.name
    );

    // Store LangChain Documents, not raw text
    setDocument(docs, {
      name: file.name,
      type: file.type,
      pages: docs.length,
    });

    return new Response(
      JSON.stringify({
        success: true,
        pages: docs.length,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
