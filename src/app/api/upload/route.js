import { extractTextFromFile } from "@/lib/extractText";

export const runtime = "nodejs";

export async function POST(req) {
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

  return new Response(
    JSON.stringify({
      success: true,
      textLength: text.length,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
