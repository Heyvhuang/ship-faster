import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Sandbox Config Templates — One-Click Sandbox Configs for AI Agents",
  description:
    "Pre-built macOS sandbox configuration templates for Claude, GPT, and local AI agents. Import with one click into Agent Safehouse.",
  openGraph: {
    title: "Agent Sandbox Config Templates",
    description:
      "Pre-built macOS sandbox configuration templates for Claude, GPT, and local AI agents.",
    type: "website",
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
