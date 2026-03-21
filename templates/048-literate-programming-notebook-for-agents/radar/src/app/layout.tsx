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
  title: "AgentLit — Literate Programming Notebook for AI Agents",
  description:
    "Transform AI agent conversation logs into polished literate programming documents with automatically extracted, executable code blocks.",
  openGraph: {
    title: "AgentLit — Literate Programming Notebook for AI Agents",
    description:
      "Convert AI agent chat logs into literate programming documents with one-click code extraction and markdown formatting.",
    type: "website",
    siteName: "AgentLit",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentLit — Literate Programming Notebook for AI Agents",
    description:
      "Convert AI agent chat logs into literate programming documents with one-click code extraction.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
