import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/runtime-site-url";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Radar — Research Agent Eval Runner",
  description:
    "One API call to run paper-specific agent evaluations on fresh research tasks. Hosted benchmarking for AI labs.",
  openGraph: {
    title: "Radar — Research Agent Eval Runner",
    description:
      "One API call to run paper-specific agent evaluations on fresh research tasks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
