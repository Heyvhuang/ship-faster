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
  title: "HN Account Age Filter — Filter Hacker News by Account Age",
  description:
    "A browser extension that filters Hacker News posts by submitter account age. Hide content from newly created accounts with one click.",
  openGraph: {
    title: "HN Account Age Filter",
    description:
      "Filter Hacker News posts by submitter account age. Hide spam and low-quality content from new accounts.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HN Account Age Filter",
    description:
      "Filter Hacker News posts by submitter account age. Hide spam and low-quality content from new accounts.",
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
        {children}
      </body>
    </html>
  );
}
