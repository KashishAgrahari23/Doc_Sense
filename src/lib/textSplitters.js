import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function splitDocuments(documents) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,      // characters
    chunkOverlap: 200,    // overlap between chunks
  });

  const splitDocs = await splitter.splitDocuments(documents);

  return splitDocs;
}
