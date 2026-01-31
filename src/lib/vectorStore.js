import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddings } from "@/lib/embeddings";

let vectorStore = null;

export async function getOrCreateVectorStore() {
  if (vectorStore) return vectorStore;

  vectorStore = await Chroma.fromExistingCollection(embeddings, {
    collectionName: "docsense",
    persistDirectory: "./chroma",
  });

  return vectorStore;
}

export async function addDocumentsToVectorStore(docs) {
  const store = await getOrCreateVectorStore();
  await store.addDocuments(docs);
}
