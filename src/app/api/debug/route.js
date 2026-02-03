// src/app/api/debug/chroma/route.js
import { ChromaClient } from "chromadb";

export async function GET() {
  const client = new ChromaClient({
    path: "http://localhost:8000",
  });

  const collection = await client.getCollection({
    name: "docsense",
  });

  const count = await collection.count();

  return Response.json({
    vectorsStored: count,
  });
}
