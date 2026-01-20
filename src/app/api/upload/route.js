import { extractTextFromFile } from "@/lib/extractText";
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
    const text = await extractTextFromFile(buffer, file.type);

    setDocument(text, {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Document stored in memory",
        textLength: text.length,
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
