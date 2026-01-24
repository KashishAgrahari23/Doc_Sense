import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

import fs from "fs";
import path from "path";
import os from "os";

export async function loadDocument(buffer, mimeType, filename) {
  // Create temp file (LangChain loaders work on files, not buffers)
  const tempDir = os.tmpdir();
  const tempPath = path.join(tempDir, filename);

  fs.writeFileSync(tempPath, buffer);

  let loader;

  if (mimeType === "application/pdf") {
    loader = new PDFLoader(tempPath);
  } 
  else if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    loader = new DocxLoader(tempPath);
  } 
  else {
    fs.unlinkSync(tempPath);
    throw new Error("Unsupported file type");
  }

  const docs = await loader.load();

  fs.unlinkSync(tempPath); 

  return docs;
}
