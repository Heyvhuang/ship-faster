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
  title: "Radar — Validate Your Startup Idea with Expert Analysis + Real Data",
  description:
    "Get your startup idea validated by experienced founders using real competitor data and market intelligence. Expert analysis + live data in 48 hours.",
  openGraph: {
    title: "Radar — Data-Backed Startup Idea Validation",
    description:
      "Expert maker analysis combined with live competitor intelligence. Validate your startup idea in 48 hours.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radar — Validate Your Startup Idea",
    description:
      "Expert analysis + real competitor data. Get a go/no-go recommendation in 48 hours.",
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
