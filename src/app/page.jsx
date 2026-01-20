"use client";

import UploadFile from "@/components/UploadFile";
import ChatPanel from "@/components/ChatPanel";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useDocumentStatus } from "@/hooks/useDocumentStatus";

export default function Home() {
  const { loading, document } = useDocumentStatus();

  return (
    <>
      {/* SIGNED IN APP */}
      <SignedIn>
        {loading ? (
          <div className="h-screen flex items-center justify-center text-gray-500">
            Checking document status...
          </div>
        ) : (
          <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upload always enabled */}
            <UploadFile />

            {/* Chat enabled only if document exists */}
            <div className="md:col-span-2">
              <ChatPanel enabled={!!document} />
            </div>
          </div>
        )}
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

            <a
              href="#features"
              className="px-6 py-3 rounded-lg border font-medium"
            >
              Learn More
            </a>
          </div>

          {/* FEATURES */}
          <div
            id="features"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
          >
            <Feature
              title="Private & Secure"
              desc="Your documents are accessible only to you."
            />
            <Feature
              title="Grounded Answers"
              desc="Answers are generated only from your uploaded files."
            />
            <Feature
              title="Built for Productivity"
              desc="Save time searching long PDFs or docs."
            />
          </div>
        </section>
      </SignedOut>
    </>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-blue-950 border border-blue-900 rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm text-gray-300">{desc}</p>
    </div>
  );
}
