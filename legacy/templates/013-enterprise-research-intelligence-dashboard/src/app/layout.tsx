import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
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
    default: "ResearchPulse — Enterprise Research Intelligence",
    template: "%s | ResearchPulse",
  },
  description:
    "Transform academic papers into actionable competitive insights for healthcare AI companies. Track regulatory implications and market opportunities with weekly AI-curated digests.",
  openGraph: {
    title: "ResearchPulse — Enterprise Research Intelligence",
    description:
      "Transform academic papers into actionable competitive insights for healthcare AI companies.",
    type: "website",
    locale: "en_US",
    siteName: "ResearchPulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResearchPulse — Enterprise Research Intelligence",
    description:
      "Transform academic papers into actionable competitive insights for healthcare AI companies.",
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
