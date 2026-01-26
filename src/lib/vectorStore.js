import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { embeddings } from "@/lib/embeddings";

let vectorStore = null;

export async function createVectorStore(docs) {
  vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    embeddings
  );
  return vectorStore;
}

export function getVectorStore() {
  return vectorStore;
}
