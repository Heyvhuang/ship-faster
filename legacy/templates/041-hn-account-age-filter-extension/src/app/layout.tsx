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
  title: "HN Filter — Account Age & Karma Filter for Hacker News",
  description:
    "Browser extension that filters Hacker News posts by account age and karma thresholds. Cut through spam and low-effort content automatically.",
  openGraph: {
    title: "HN Filter — Account Age & Karma Filter for Hacker News",
    description:
      "Browser extension that filters Hacker News posts by account age and karma thresholds. Cut through spam and low-effort content automatically.",
    type: "website",
    url: "https://hnfilter.dev",
    siteName: "HN Filter",
  },
  twitter: {
    card: "summary_large_image",
    title: "HN Filter — Account Age & Karma Filter for Hacker News",
    description:
      "Browser extension that filters Hacker News posts by account age and karma thresholds.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
