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
  title: "AgentGuard — Multi-Agent Compliance Simulator",
  description:
    "Stop emergent AI violations before the SEC does. Simulate multi-agent AI societies to detect compliance violations before production deployment.",
  openGraph: {
    title: "AgentGuard — Multi-Agent Compliance Simulator",
    description:
      "Pre-deployment safety layer that catches emergent compliance violations in multi-agent AI systems for regulated enterprises.",
    type: "website",
    url: "https://agentguard.ai",
    siteName: "AgentGuard",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentGuard — Multi-Agent Compliance Simulator",
    description:
      "Simulate multi-agent AI societies to detect emergent compliance violations before production deployment.",
  },
  keywords: [
    "AI compliance",
    "multi-agent simulation",
    "SEC compliance",
    "trading AI",
    "regulatory technology",
    "RegTech",
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
