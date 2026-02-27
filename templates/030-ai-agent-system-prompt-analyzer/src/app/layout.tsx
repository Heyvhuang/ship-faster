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
  title: "PromptShield — AI Agent System Prompt Analyzer",
  description:
    "Analyze AI agent system prompts for security vulnerabilities, effectiveness scores, and edge case weaknesses. Get actionable improvement suggestions.",
  openGraph: {
    title: "PromptShield — AI Agent System Prompt Analyzer",
    description:
      "Security and effectiveness scoring for AI agent system prompts. Detect injection risks, edge cases, and get rewritten suggestions.",
    type: "website",
    url: "https://promptshield.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptShield — AI Agent System Prompt Analyzer",
    description:
      "Analyze your AI agent system prompts for vulnerabilities and effectiveness.",
  },
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
