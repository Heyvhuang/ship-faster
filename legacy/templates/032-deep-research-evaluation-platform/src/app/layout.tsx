import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DREAM Eval — Deep Research Agent Evaluation Platform",
  description:
    "Benchmark AI research agents using DREAM-style agentic reasoning metrics. Score reasoning quality, compare agents side-by-side, and generate production-ready evaluation reports.",
  openGraph: {
    title: "DREAM Eval — Deep Research Agent Evaluation Platform",
    description:
      "Benchmark AI research agents using DREAM-style agentic reasoning metrics.",
    type: "website",
    url: "https://dreameval.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "DREAM Eval — Deep Research Agent Evaluation Platform",
    description:
      "Benchmark AI research agents using DREAM-style agentic reasoning metrics.",
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
