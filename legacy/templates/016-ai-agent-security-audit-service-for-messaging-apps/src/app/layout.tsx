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
  title: "AgentShield | AI Agent Security Audit Service",
  description:
    "Specialized security audit service for AI agents deployed in messaging apps. Find hidden data exfiltration risks through URL previews and messaging integrations.",
  openGraph: {
    title: "AgentShield | AI Agent Security Audit Service",
    description:
      "Find hidden data exfiltration risks in your AI agent implementations. The only security service testing for URL preview and messaging integration vulnerabilities.",
    type: "website",
    locale: "en_US",
    siteName: "AgentShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentShield | AI Agent Security Audit Service",
    description:
      "Find hidden data exfiltration risks in your AI agent implementations.",
  },
  keywords: [
    "AI agent security",
    "data exfiltration",
    "URL preview vulnerability",
    "messaging security",
    "penetration testing",
    "AI chatbot security",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
