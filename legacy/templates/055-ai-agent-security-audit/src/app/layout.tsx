import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentShield — AI Agent Security Audit",
  description:
    "Protect your AI agents from prompt injection, data leakage, and sandbox escape attacks. The only security audit service built specifically for AI deployments.",
  openGraph: {
    title: "AgentShield — AI Agent Security Audit",
    description:
      "Protect your AI agents from prompt injection, data leakage, and sandbox escape attacks.",
    type: "website",
    siteName: "AgentShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentShield — AI Agent Security Audit",
    description:
      "Protect your AI agents from prompt injection, data leakage, and sandbox escape attacks.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
