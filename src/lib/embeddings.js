import { HuggingFaceTransformersEmbeddings }
  from "@langchain/community/embeddings/transformers";

export const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "sentence-transformers/all-MiniLM-L6-v2",
});
