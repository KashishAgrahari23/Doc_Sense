"use client";
import { useState } from "react";

export default function ChatPanel({ enabled }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!enabled || !input.trim() || loading) return;

    const userMessage = { role: "user", content: input };

    // 1️⃣ Update UI immediately
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage.content,
          history: messages.slice(-5), // 👈 last 5 turns
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // 2️⃣ Add assistant response
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Error: " + err.message },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col h-full">
      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-3 text-sm">
        {!enabled && (
          <div className="h-full flex items-center justify-center text-gray-900">
            Upload a document to start chatting 📄
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-lg ${
              msg.role === "user"
                ? "ml-auto bg-indigo-600 text-white"
                : "mr-auto bg-gray-100 text-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-gray-100 text-gray-500 px-4 py-2 rounded-lg">
            Thinking…
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={!enabled || loading}
          placeholder="Ask something about the document…"
          className="flex-1 rounded-lg border px-3 py-2 text-sm text-gray-900 disabled:bg-gray-100"
        />

        <button
          onClick={sendMessage}
          disabled={!enabled || loading}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
