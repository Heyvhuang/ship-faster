import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SightLine API — Line of Sight Calculation Service",
    template: "%s | SightLine API",
  },
  description:
    "API-first line-of-sight calculation service for photographers, telecom engineers, and professionals who need precise viewpoint optimization.",
  openGraph: {
    title: "SightLine API — Line of Sight Calculation Service",
    description:
      "Precise viewpoint optimization and line-of-sight analysis via a simple API. Pay $0.10 per calculation.",
    type: "website",
    url: "https://sightline.dev",
    siteName: "SightLine API",
  },
  twitter: {
    card: "summary_large_image",
    title: "SightLine API",
    description:
      "API-first line-of-sight calculation service with elevation-aware terrain modeling.",
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
