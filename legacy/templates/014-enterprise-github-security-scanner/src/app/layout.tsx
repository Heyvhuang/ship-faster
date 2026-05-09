import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
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
  title: {
    default: "ShieldWatch — Enterprise GitHub Security Scanner",
    template: "%s | ShieldWatch",
  },
  description:
    "Weekly security intelligence identifying vulnerable trending GitHub repositories before your developers copy them into production. Protect your supply chain proactively.",
  openGraph: {
    title: "ShieldWatch — Enterprise GitHub Security Scanner",
    description:
      "Weekly security intelligence identifying vulnerable trending GitHub repositories before your developers copy them into production.",
    type: "website",
    url: "https://shieldwatch.io",
    siteName: "ShieldWatch",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShieldWatch — Enterprise GitHub Security Scanner",
    description:
      "Weekly security intelligence identifying vulnerable trending GitHub repositories before your developers copy them into production.",
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
