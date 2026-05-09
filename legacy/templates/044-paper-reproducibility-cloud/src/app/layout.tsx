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
  title: "Paper Reproducibility Cloud | Run Any HuggingFace Paper Instantly",
  description:
    "Guaranteed working reproduction of any HuggingFace trending paper in under 2 minutes. One-click cloud environments with verified dependencies, GPU access, and browser-based JupyterLab.",
  openGraph: {
    title: "Paper Reproducibility Cloud",
    description:
      "Run any HuggingFace trending paper in under 2 minutes. Pre-built containers, verified dependencies, one-click execution.",
    type: "website",
    siteName: "Paper Reproducibility Cloud",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper Reproducibility Cloud",
    description:
      "Run any HuggingFace trending paper in under 2 minutes. Pre-built containers, verified dependencies, one-click execution.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
