import { MessageSquare, Send } from "lucide-react";

export default function ChatPanel() {
  return (
    <div className="bg-white rounded-xl border shadow-sm flex flex-col">
      
      {/* Header */}
      <div className="border-b px-6 py-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Chat with Document</h2>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center text-center px-6 text-gray-500">
        <div className="space-y-2">
          <p className="text-sm">
            Upload a document to start asking questions
          </p>
          <p className="text-xs text-gray-400">
            Answers will be generated strictly from your document
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="border-t px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask a question about your document..."
          className="flex-1 rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled
        />
        <button
          disabled
          className="bg-indigo-600 text-white rounded-lg p-2 opacity-50 cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
