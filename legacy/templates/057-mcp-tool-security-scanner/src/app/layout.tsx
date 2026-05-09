import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/runtime-site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MCP Radar — Security Scanner for Model Context Protocol Tools",
  description:
    "Enterprise security validation for MCP tools. Scan for data exfiltration risks, permission boundary violations, and misconfigurations before deploying third-party MCP integrations.",
  openGraph: {
    title: "MCP Radar — Security Scanner for Model Context Protocol Tools",
    description:
      "Pre-deployment security audits for MCP tools. Detect data exfiltration, permission boundary issues, and misconfigurations.",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
