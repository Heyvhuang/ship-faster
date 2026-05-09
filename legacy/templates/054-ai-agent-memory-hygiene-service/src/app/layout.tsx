import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "MemoryGuard — Automated PII Scrubbing for AI Agent Memory",
    template: "%s | MemoryGuard",
  },
  description:
    "Automated PII scrubbing and memory compression for AI agent conversation memory. GDPR Art. 17 compliant with audit trails. Free tier available.",
  openGraph: {
    title: "MemoryGuard — Automated PII Scrubbing for AI Agent Memory",
    description:
      "Your AI agents store PII in every conversation. MemoryGuard detects, scrubs, and proves deletion — GDPR compliant in one click.",
    type: "website",
    siteName: "MemoryGuard",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
