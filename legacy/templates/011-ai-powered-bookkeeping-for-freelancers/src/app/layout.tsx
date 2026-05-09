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
  title: "LedgerAI - AI-Powered Bookkeeping for Content Creators",
  description:
    "Stop drowning in spreadsheets. LedgerAI auto-categorizes expenses, aggregates 1099s, and generates your Schedule C in minutes. Built for YouTubers, Patreon creators, and freelancers.",
  openGraph: {
    title: "LedgerAI - AI-Powered Bookkeeping for Content Creators",
    description:
      "Auto-categorize expenses, aggregate 1099s, and file taxes in minutes. Built for solo creators.",
    type: "website",
    url: "https://ledgerai.app",
    siteName: "LedgerAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "LedgerAI - AI Bookkeeping for Creators",
    description:
      "From 15 hours to 30 minutes. AI-powered tax prep for content creators.",
  },
  keywords: [
    "bookkeeping",
    "freelancer taxes",
    "1099",
    "content creator",
    "Schedule C",
    "AI accounting",
    "YouTube taxes",
    "Patreon income",
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
