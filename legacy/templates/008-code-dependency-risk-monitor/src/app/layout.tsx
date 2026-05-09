import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DepRadar — Dependency Risk Monitor",
  description: "Early warning system for production dependency risks. Monitor trending repositories for breaking changes and security issues before they hit your stack.",
  openGraph: {
    title: "DepRadar — Dependency Risk Monitor",
    description: "Early warning system for production dependency risks. Monitor trending repositories for breaking changes and security issues before they hit your stack.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DepRadar — Dependency Risk Monitor",
    description: "Early warning system for production dependency risks.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
