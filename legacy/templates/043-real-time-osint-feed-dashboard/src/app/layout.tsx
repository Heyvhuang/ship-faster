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
  title: "Radar — Real-Time OSINT Feed Dashboard",
  description:
    "Curated OSINT dashboard with 15+ verified global feeds and custom alerting for researchers and journalists.",
  openGraph: {
    title: "Radar — Real-Time OSINT Feed Dashboard",
    description:
      "Curated OSINT dashboard with 15+ verified global feeds and custom alerting for researchers and journalists.",
    type: "website",
    siteName: "Radar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radar — Real-Time OSINT Feed Dashboard",
    description:
      "Curated OSINT dashboard with 15+ verified global feeds and custom alerting.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
