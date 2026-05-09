import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContextLens — Agent Context Window Debugger",
  description:
    "Visual debugger for AI agent developers to inspect context windows, track token usage, and identify memory bottlenecks in real-time.",
  openGraph: {
    title: "ContextLens — Agent Context Window Debugger",
    description:
      "Visual debugger for AI agent developers to inspect context windows, track token usage, and identify memory bottlenecks in real-time.",
    type: "website",
    url: "https://contextlens.dev",
    siteName: "ContextLens",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextLens — Agent Context Window Debugger",
    description:
      "Visual debugger for AI agent developers to inspect context windows, track token usage, and identify memory bottlenecks in real-time.",
  },
  keywords: [
    "AI agent debugger",
    "context window",
    "token usage",
    "LLM debugging",
    "agent development",
    "context engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
