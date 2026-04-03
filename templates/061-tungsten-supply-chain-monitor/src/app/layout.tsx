import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/runtime-site-url";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Tungsten Supply Chain Monitor | Critical Material Intelligence",
  description:
    "Real-time tungsten pricing, supplier risk scoring, and availability alerts for aerospace and defense manufacturers. Never run out of tungsten.",
  openGraph: {
    title: "Tungsten Supply Chain Monitor",
    description:
      "Critical material intelligence for aerospace and defense manufacturers who depend on predictable tungsten sourcing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
