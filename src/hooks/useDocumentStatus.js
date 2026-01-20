"use client";

import { useEffect, useState } from "react";

export function useDocumentStatus() {
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    async function checkDocument() {
      try {
        const res = await fetch("/api/document");

        if (!res.ok) {
          setDocument(null);
        } else {
          const data = await res.json();
          setDocument(data);
        }
      } catch {
        setDocument(null);
      } finally {
        setLoading(false);
      }
    }

    checkDocument();
  }, []);

  return { loading, document };
}
