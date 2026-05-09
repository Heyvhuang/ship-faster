import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AgentShield — AI Agent Security Audits",
    template: "%s | AgentShield",
  },
  description:
    "Protect your AI agents from prompt injection, data leakage, and sandbox escape attacks. Automated security testing built specifically for AI deployments.",
  openGraph: {
    title: "AgentShield — AI Agent Security Audits",
    description:
      "Protect your AI agents from prompt injection, data leakage, and sandbox escape attacks.",
    type: "website",
    locale: "en_US",
    siteName: "AgentShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentShield — AI Agent Security Audits",
    description:
      "Protect your AI agents from prompt injection, data leakage, and sandbox escape attacks.",
  },
  robots: { index: true, follow: true },
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
