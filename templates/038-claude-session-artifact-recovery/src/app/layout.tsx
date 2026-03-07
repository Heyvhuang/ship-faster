import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SessionRecover — Recover Lost Code from Claude Code Sessions",
  description:
    "Extract and reconstruct lost code from accidentally closed Claude Code sessions. One-click recovery with local-only processing.",
  openGraph: {
    title: "SessionRecover — Recover Lost Code from Claude Code Sessions",
    description:
      "Extract and reconstruct lost code from accidentally closed Claude Code sessions. One-click recovery with local-only processing.",
    type: "website",
    siteName: "SessionRecover",
  },
  twitter: {
    card: "summary_large_image",
    title: "SessionRecover — Recover Lost Code from Claude Code Sessions",
    description:
      "Extract and reconstruct lost code from accidentally closed Claude Code sessions.",
  },
  keywords: [
    "claude code",
    "session recovery",
    "code recovery",
    "artifact recovery",
    "developer tools",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
