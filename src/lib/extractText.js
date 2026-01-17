import mammoth from "mammoth";

export async function extractTextFromFile(buffer, mimeType) {
  // PDF
  if (mimeType === "application/pdf") {
    // 👇 dynamic require (IMPORTANT)
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text;
  }

  // DOCX
  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file type");
}
