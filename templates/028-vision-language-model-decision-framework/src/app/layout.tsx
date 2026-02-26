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
  title: "VLM Selector — Find Your Perfect Vision-Language Model",
  description:
    "Interactive decision framework helping engineers choose the right Vision-Language Model based on use case requirements, edge deployment constraints, and hardware targets.",
  openGraph: {
    title: "VLM Selector — Find Your Perfect Vision-Language Model",
    description:
      "Choose the right VLM based on latency, memory, hardware, and accuracy constraints.",
    type: "website",
    siteName: "VLM Selector",
  },
  twitter: {
    card: "summary_large_image",
    title: "VLM Selector — Find Your Perfect Vision-Language Model",
    description:
      "Interactive decision framework for choosing Vision-Language Models.",
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
