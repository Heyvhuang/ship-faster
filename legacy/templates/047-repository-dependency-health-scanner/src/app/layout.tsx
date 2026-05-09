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
  title: "DepRadar — Dependency Health Scanner",
  description:
    "Monitor npm dependency health beyond security vulnerabilities. Detect abandoned packages, maintainer burnout signals, and deprecation risks before they break your build.",
  openGraph: {
    title: "DepRadar — Dependency Health Scanner",
    description:
      "Monitor npm dependency health beyond security. Abandonment signals, maintainer inactivity, deprecation warnings.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DepRadar — Dependency Health Scanner",
    description:
      "Monitor npm dependency health beyond security. Abandonment signals, maintainer inactivity, deprecation warnings.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
