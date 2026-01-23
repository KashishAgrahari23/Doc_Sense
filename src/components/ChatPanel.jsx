"use client";
import { useState } from "react";

export default function ChatPanel({ enabled }) {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!enabled || !message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Chat failed");
      }

      setReply(data.answer);
    } catch (err) {
      setReply("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 overflow-auto text-sm text-gray-600 whitespace-pre-wrap">
  {!enabled ? (
    <div className="h-full flex items-center justify-center text-center text-gray-400">
      Upload a document to start chatting 📄
    </div>
  ) : answer ? (
    <>
      <p>{answer}</p>

      {source && (
        <div className="mt-3 text-xs text-gray-400 border-t pt-2">
          <strong>Source:</strong> Chunk #{source.chunkIndex}
        </div>
      )}
    </>
  ) : (
    <p className="text-gray-400">
      Ask a question about your document 👇
    </p>
  )}
</div>

  );
}
