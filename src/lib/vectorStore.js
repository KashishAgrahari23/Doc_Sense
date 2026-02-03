import { Chroma } from "@langchain/community/vectorstores/chroma";
import { getEmbeddings } from "@/lib/embeddings";

let vectorStore = null;

export async function getVectorStore() {
  if (vectorStore) return vectorStore;

  vectorStore = await Chroma.fromExistingCollection(
    getEmbeddings(),
    {
      collectionName: "docsense",
      url: "http://localhost:8000",
    }
  );

  return vectorStore;
}

export async function addDocumentsToVectorStore(docs) {
  const store = await getVectorStore();

  // 🔥 IMPORTANT: batch insert
  for (let i = 0; i < docs.length; i += 5) {
    const batch = docs.slice(i, i + 5);
    await store.addDocuments(batch);
  }
}
