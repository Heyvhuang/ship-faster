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
  title: "AgentMetrics — Agent Performance & Cost Dashboard",
  description:
    "Track cost and success metrics for AI agent executions. Know exactly what your agents cost to run and how well they perform.",
  openGraph: {
    title: "AgentMetrics — Agent Performance & Cost Dashboard",
    description:
      "Track cost and success metrics for AI agent executions. Know exactly what your agents cost to run and how well they perform.",
    type: "website",
    url: "https://agentmetrics.dev",
    siteName: "AgentMetrics",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentMetrics — Agent Performance & Cost Dashboard",
    description:
      "Track cost and success metrics for AI agent executions. Know exactly what your agents cost to run and how well they perform.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
