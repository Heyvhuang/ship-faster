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
  title: "OpsStatus — System Status Page",
  description:
    "Real-time system status, incident history, and uptime metrics. Stay informed about service health and ongoing incidents.",
  openGraph: {
    title: "OpsStatus — System Status Page",
    description:
      "Real-time system status, incident history, and uptime metrics.",
    type: "website",
    url: "https://opsstatus.example.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpsStatus — System Status Page",
    description:
      "Real-time system status, incident history, and uptime metrics.",
  },
  keywords: ["status page template", "incident dashboard starter", "uptime monitoring", "system status"],
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
