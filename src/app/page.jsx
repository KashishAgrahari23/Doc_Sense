"use client";

import { useState } from "react";
import UploadFile from "@/components/UploadFile";
import ChatPanel from "@/components/ChatPanel";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
  const [documentReady, setDocumentReady] = useState(false);

  return (
    <>
      {/* SIGNED IN APP */}
      <SignedIn>
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <UploadFile onUploadSuccess={() => setDocumentReady(true)} />

          <div className="md:col-span-2">
            <ChatPanel enabled={documentReady} />
          </div>
        </div>
      </SignedIn>

      {/* SIGNED OUT LANDING */}
      <SignedOut>
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Chat with your documents.
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            Upload PDFs or Word files and ask questions.
            <br />
            DocSense answers strictly from your document — no hallucinations.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <SignInButton>
              <button className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
                Get Started
              </button>
            </SignInButton>
          </div>
        </section>
      </SignedOut>
    </>
  );
}
