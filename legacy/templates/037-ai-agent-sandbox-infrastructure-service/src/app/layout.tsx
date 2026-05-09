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
  title: "SandboxKit — Managed Secure Sandboxes for AI Agents",
  description:
    "Deploy and run AI agents in isolated sandboxes with automatic security policies, resource limits, and real-time monitoring. No infrastructure setup required.",
  openGraph: {
    title: "SandboxKit — Managed Secure Sandboxes for AI Agents",
    description:
      "Deploy and run AI agents in isolated sandboxes with automatic security policies, resource limits, and real-time monitoring.",
    type: "website",
    url: "https://sandboxkit.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "SandboxKit — Managed Secure Sandboxes for AI Agents",
    description:
      "Deploy and run AI agents in isolated sandboxes with automatic security policies, resource limits, and real-time monitoring.",
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
