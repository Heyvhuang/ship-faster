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
  title: "ExfilGuard — LLM Data Exfiltration Scanner",
  description:
    "The first security scanner for LLM data exfiltration through messaging app integrations. Detect data leaks via URL previews and prompt injection in Slack, Teams, and Discord AI bots.",
  openGraph: {
    title: "ExfilGuard — LLM Data Exfiltration Scanner",
    description:
      "Scan your AI messaging integrations for data exfiltration vulnerabilities. Detect URL preview leaks, prompt injection, and unauthorized data extraction.",
    type: "website",
    siteName: "ExfilGuard",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExfilGuard — LLM Data Exfiltration Scanner",
    description:
      "Scan your AI messaging integrations for data exfiltration vulnerabilities.",
  },
  keywords: [
    "LLM security",
    "data exfiltration",
    "AI security scanner",
    "Slack bot security",
    "prompt injection",
    "messaging app security",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-[#e2e2e8]`}
      >
        {children}
      </body>
    </html>
  );
}
