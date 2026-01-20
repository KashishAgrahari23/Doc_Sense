
let currentDocument = null;

export function setDocument(text, meta = {}) {
  currentDocument = {
    text,
    meta,
    createdAt: new Date(),
  };
}

export function getDocument() {
  return currentDocument;
}

export function clearDocument() {
  currentDocument = null;
}
