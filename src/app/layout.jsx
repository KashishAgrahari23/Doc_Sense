import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocSense",
  description: "Chat with your documents securely",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        >
          <div className="flex min-h-screen flex-col">
            {/* HEADER */}
            <header className="bg-indigo-900 text-white">
              <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
                <h1 className="text-lg font-semibold">DocSense</h1>

                <div className="flex items-center gap-3">
                  <SignedOut>
                    <SignInButton>
                      <button className="px-4 py-1.5 rounded-md border border-white/30 text-sm">
                        Sign In
                      </button>
                    </SignInButton>

                    <SignUpButton>
                      <button className="px-4 py-1.5 rounded-md bg-white text-indigo-900 text-sm font-medium">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </div>
              </div>
            </header>

            {/* MAIN */}
            <main className="flex-1">
              {children}
            </main>

            {/* FOOTER */}
            <footer className="border-t bg-indigo-900">
              <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-black-600 flex flex-col md:flex-row justify-between gap-4">
                <p>© {new Date().getFullYear()} DocSense</p>

                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/in/your-link"
                    target="_blank"
                    className="hover:text-black"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/your-github"
                    target="_blank"
                    className="hover:text-black"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://leetcode.com/your-id"
                    target="_blank"
                    className="hover:text-black"
                  >
                    LeetCode
                  </a>
                  <a
                    href="https://your-portfolio.com"
                    target="_blank"
                    className="hover:text-black"
                  >
                    Portfolio
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
