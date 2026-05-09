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
  title: "Radar — New Account Quality Filter",
  description:
    "Stop spammers before they post. Account quality scoring API for community moderators to automatically filter low-quality submissions.",
  openGraph: {
    title: "Radar — New Account Quality Filter",
    description:
      "Account quality scoring API for community moderators. Block spammers and low-effort posts automatically.",
    type: "website",
    siteName: "Radar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radar — New Account Quality Filter",
    description:
      "Account quality scoring API for community moderators. Block spammers and low-effort posts automatically.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
