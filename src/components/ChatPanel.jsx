"use client";

export default function ChatPanel({ enabled }) {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl border shadow-sm p-4">
      {/* Messages area */}
      <div className="flex-1 overflow-auto text-sm text-gray-500">
        {enabled ? (
          <p className="text-gray-400">
            Ask a question about your document 👇
          </p>
        ) : (
          <div className="h-full flex items-center justify-center text-center text-gray-400">
            <p>Upload a document to start chatting 📄</p>
          </div>
        )}
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder={
          enabled
            ? "Ask something about the document..."
            : "Upload a document first"
        }
        disabled={!enabled}   // ✅ THIS is critical
        className="mt-4 w-full rounded-lg border px-3 py-2 text-sm
          disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}
