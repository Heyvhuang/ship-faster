import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PaperBridge — AI Research Paper Translation for Chinese Teams",
  description:
    "Premium AI research paper translation service delivering technical accuracy for Chinese research teams. Monthly delivery of top 20 trending papers from Hugging Face, translated with precision.",
  openGraph: {
    title: "PaperBridge — AI Research Paper Translation",
    description:
      "Technical-grade translation of cutting-edge AI papers into Chinese. Preserving mathematical notation, code, and domain terminology.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperBridge — AI Research Paper Translation",
    description:
      "Technical-grade translation of cutting-edge AI papers into Chinese.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
