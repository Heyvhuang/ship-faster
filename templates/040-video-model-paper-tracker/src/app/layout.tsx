import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VideoModelWeekly — Video AI Paper Digest",
  description:
    "Weekly email digest tracking video generation and editing papers with benchmark scores and open-source model links for creators and researchers.",
  openGraph: {
    title: "VideoModelWeekly — Video AI Paper Digest",
    description:
      "Weekly curated video generation & editing papers with benchmarks and model links.",
    type: "website",
    url: "https://videomodelweekly.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "VideoModelWeekly — Video AI Paper Digest",
    description:
      "Weekly curated video generation & editing papers with benchmarks and model links.",
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
