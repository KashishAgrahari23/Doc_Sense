import mammoth from "mammoth";
import PDFParser from "pdf2json";

export function extractPdfText(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", err =>
      reject(err.parserError)
    );

    pdfParser.on("pdfParser_dataReady", pdfData => {
      const pages = pdfData.Pages || [];
      let text = "";

      for (const page of pages) {
        for (const textItem of page.Texts) {
          text += decodeURIComponent(textItem.R[0].T) + " ";
        }
        text += "\n";
      }

      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

export async function extractTextFromFile(buffer, mimeType) {
  // PDF
  if (mimeType === "application/pdf") {
    return await extractPdfText(buffer);
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
