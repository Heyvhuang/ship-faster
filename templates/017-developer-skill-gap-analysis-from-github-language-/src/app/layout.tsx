import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevGap — Developer Skill Gap Analysis from GitHub",
  description:
    "Turn GitHub commits into hiring roadmaps. Analyze your team's code against trending tech stacks to identify skill gaps and hiring priorities.",
  openGraph: {
    title: "DevGap — Developer Skill Gap Analysis from GitHub",
    description:
      "Turn GitHub commits into hiring roadmaps. Compare your team against trending tech stacks.",
    type: "website",
    url: "https://devgap.dev",
    siteName: "DevGap",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevGap — Skill Gap Analysis from GitHub",
    description:
      "Turn GitHub commits into hiring roadmaps for scaling engineering teams.",
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
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
