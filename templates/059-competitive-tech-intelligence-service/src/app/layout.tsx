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
  title: "Radar — Competitive Tech Intelligence",
  description:
    "Reveal competitor technology stack decisions through GitHub activity analysis. Monthly intelligence reports for PMs and CTOs.",
  openGraph: {
    title: "Radar — Competitive Tech Intelligence",
    description:
      "Reveal competitor technology stack decisions through GitHub activity analysis.",
    type: "website",
    siteName: "Radar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radar — Competitive Tech Intelligence",
    description:
      "Reveal competitor technology stack decisions through GitHub activity analysis.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
