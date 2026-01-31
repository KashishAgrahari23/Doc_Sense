import { loadDocument } from "@/lib/loadDocument";
import { splitDocuments } from "@/lib/textSplitters";
import { addDocumentsToVectorStore } from "@/lib/vectorStore";

import fs from "fs/promises";
import path from "path";
import os from "os";

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

    // 1️⃣ Convert file → buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 2️⃣ Load document via LangChain loaders
    const documents = await loadDocument(
      buffer,
      file.type,
      file.name
    );

    // 3️⃣ Split documents into chunks
    const splitDocs = await splitDocuments(documents);

    // 4️⃣ Store chunks into Chroma (embeddings happen here)
    await addDocumentsToVectorStore(splitDocs);

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
