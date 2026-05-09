import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptShield - AI System Prompt Security Audit",
  description:
    "Detect system prompt leaks, prompt injection vulnerabilities, and IP exposure in your AI tools. Scan and score your prompts for security risks.",
  openGraph: {
    title: "PromptShield - AI System Prompt Security Audit",
    description:
      "Detect system prompt leaks, prompt injection vulnerabilities, and IP exposure in your AI tools.",
    type: "website",
    url: "https://promptshield.dev",
    siteName: "PromptShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptShield - AI System Prompt Security Audit",
    description:
      "Detect system prompt leaks, prompt injection vulnerabilities, and IP exposure in your AI tools.",
  },
  keywords: [
    "AI security",
    "system prompt",
    "prompt injection",
    "prompt leak",
    "AI audit",
    "LLM security",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
