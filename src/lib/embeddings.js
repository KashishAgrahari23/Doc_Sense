import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

let embeddingsInstance = null;

export function getEmbeddings() {
  if (embeddingsInstance) return embeddingsInstance;

  const apiKey = process.env.HUGGINGFACE_API_KEY;

  if (!apiKey) {
    throw new Error("HUGGINGFACE_API_KEY not found in env");
  }

  embeddingsInstance = new HuggingFaceInferenceEmbeddings({
    apiKey,
    model: "sentence-transformers/paraphrase-multilingual-mpnet-base-v2",
  });

  console.log("✅ HuggingFace embeddings initialized");
  return embeddingsInstance;
}
