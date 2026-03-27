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
  title: "MemoryGuard — AI Agent Memory Hygiene Service",
  description:
    "Automated PII scrubbing and memory compression for long-running AI coworkers. GDPR compliant in one click.",
  openGraph: {
    title: "MemoryGuard — AI Agent Memory Hygiene Service",
    description:
      "Automated PII scrubbing and memory compression for long-running AI coworkers. GDPR compliant in one click.",
    type: "website",
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
