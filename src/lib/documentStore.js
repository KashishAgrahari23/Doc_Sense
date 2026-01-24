
let currentDocument = null;

export function setDocument(docs, meta = {}) {
  currentDocument = {
    docs,
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
