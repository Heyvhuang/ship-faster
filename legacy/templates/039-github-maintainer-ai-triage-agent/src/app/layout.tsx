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
  title: "TriageBot — AI Triage Agent for GitHub Maintainers",
  description:
    "AI-powered triage agent that drafts contextual responses to GitHub issues and PRs. Built for maintainers of 50-500 star repos.",
  openGraph: {
    title: "TriageBot — AI Triage Agent for GitHub Maintainers",
    description:
      "AI-powered triage agent that drafts contextual responses to GitHub issues and PRs.",
    type: "website",
    url: "https://triagebot.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "TriageBot — AI Triage Agent for GitHub Maintainers",
    description:
      "AI-powered triage agent that drafts contextual responses to GitHub issues and PRs.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0d1117] text-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
