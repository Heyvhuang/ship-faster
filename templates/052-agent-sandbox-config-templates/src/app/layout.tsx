import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Safespace Templates — One-Click Sandbox Configs for AI Agents on macOS",
  description:
    "Pre-built .safespace sandbox configuration templates for Claude, GPT, and Ollama. Import into Agent Safehouse with one click. Free for the first 100 users.",
  openGraph: {
    title: "Safespace Templates — One-Click Sandbox Configs for AI Agents",
    description:
      "Download pre-built .safespace sandbox configs for Claude, GPT, and local models. Secure your AI agents in seconds.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Safespace Templates — Sandbox Configs for AI Agents",
    description:
      "Pre-built .safespace configs for Claude, GPT, and Ollama. One-click import into Agent Safehouse.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
