import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExfilGuard — LLM Data Exfiltration Testing for Enterprise Messaging",
  description:
    "Find how LLM agents can leak sensitive data through URL previews in Slack, Teams, and Discord. Enterprise security assessments with actionable remediation.",
  openGraph: {
    title: "ExfilGuard — LLM Data Exfiltration Testing",
    description:
      "Does your LLM leak data through Slack previews? We find out before attackers do.",
    type: "website",
    url: "https://exfilguard.com",
    siteName: "ExfilGuard",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExfilGuard — LLM Data Exfiltration Testing",
    description:
      "Does your LLM leak data through Slack previews? We find out before attackers do.",
  },
  keywords: [
    "LLM security",
    "data exfiltration",
    "Slack security",
    "Teams security",
    "URL preview vulnerability",
    "enterprise security assessment",
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
