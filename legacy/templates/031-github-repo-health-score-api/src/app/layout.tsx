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
  title: "RepoScore — GitHub Repository Health Scores",
  description:
    "Lightweight API that scores GitHub repositories on maintenance health, security, and activity. Get a 0-100 health score for any repo in one call.",
  openGraph: {
    title: "RepoScore — GitHub Repository Health Scores",
    description:
      "Score any GitHub repo on maintenance health, security, and activity. Simple 0-100 score via API.",
    type: "website",
    url: "https://reposcore.dev",
    siteName: "RepoScore",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoScore — GitHub Repository Health Scores",
    description:
      "Score any GitHub repo on maintenance health, security, and activity. Simple 0-100 score via API.",
  },
  keywords: [
    "github",
    "repository",
    "health score",
    "dependency",
    "npm",
    "maintenance",
    "api",
    "open source",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
