import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/runtime-site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Radar — Technical Content Strategy Platform",
  description:
    "Data-driven content strategy for developer marketing teams. Identify trending technologies and topics before competitors saturate the market.",
  openGraph: {
    title: "Radar — Technical Content Strategy Platform",
    description:
      "Data-driven content strategy for developer marketing teams. Identify trending technologies and topics before competitors saturate the market.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radar — Technical Content Strategy Platform",
    description:
      "Data-driven content strategy for developer marketing teams. Identify trending technologies and topics before competitors saturate the market.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
