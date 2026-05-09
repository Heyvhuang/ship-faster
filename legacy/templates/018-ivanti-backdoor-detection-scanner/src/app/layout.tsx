import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IvantiShield — Backdoor Detection Scanner for Ivanti EPMM",
  description:
    "Detect dormant backdoors in your Ivanti EPMM systems before they activate. Enterprise-grade scanning with real-time threat detection and remediation guidance.",
  openGraph: {
    title: "IvantiShield — Backdoor Detection Scanner",
    description:
      "Detect dormant backdoors in your Ivanti EPMM systems before they activate.",
    type: "website",
    url: "https://ivantishield.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "IvantiShield — Backdoor Detection Scanner",
    description:
      "Detect dormant backdoors in your Ivanti EPMM systems before they activate.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
