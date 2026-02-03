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
    <div className="flex flex-col h-full bg-white rounded-xl border shadow-sm p-4">
      <div className="flex-1 overflow-auto text-sm text-gray-700 whitespace-pre-wrap">
        {!enabled ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Upload a document to start chatting 📄
          </div>
        ) : reply ? (
          <p>{reply}</p>
        ) : (
          <p className="text-gray-400">
            Ask a question about your document 👇
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!enabled}
          placeholder="Ask a question…"
          className="flex-1 rounded-lg border px-3 py-2 text-sm"
        />

        <button
          onClick={sendMessage}
          disabled={!enabled || loading}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
