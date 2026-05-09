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
  title: "Superpowers Methodology Course — Master Agentic AI Development",
  description:
    "Premium async training for engineering teams adopting the obra/superpowers agentic AI methodology. 7 video modules, templates, community, and lifetime access.",
  openGraph: {
    title: "Superpowers Methodology Course",
    description:
      "Structured training teaching the obra/superpowers agentic methodology to development teams.",
    type: "website",
    url: "https://superpowers.dev",
    siteName: "Superpowers Course",
  },
  twitter: {
    card: "summary_large_image",
    title: "Superpowers Methodology Course",
    description:
      "Master agentic AI development with a structured training program for engineering teams.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
