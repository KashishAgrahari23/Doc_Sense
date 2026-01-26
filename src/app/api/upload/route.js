import { loadDocument } from "@/lib/loadDocument";
import { setDocument } from "@/lib/documentStore";
import { splitDocuments } from "@/lib/textSplitters";

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

  
    const documents = await loadDocument(
      buffer,
      file.type,
      file.name
    );

    // ✅ Split into chunks
    const splitDocs = await splitDocuments(documents);

    // ✅ Store in memory
    setDocument(splitDocs, {
      name: file.name,
      type: file.type,
      size: file.size,
      chunks: splitDocs.length,
    });

    return new Response(
      JSON.stringify({
        success: true,
        chunks: splitDocs.length,
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
