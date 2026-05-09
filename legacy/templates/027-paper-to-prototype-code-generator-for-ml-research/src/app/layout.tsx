import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PaperCode — ML Paper to Prototype Code Generator",
  description:
    "Automatically convert ML research papers into working prototype code with standardized APIs. Save weeks of manual implementation time.",
  openGraph: {
    title: "PaperCode — ML Paper to Prototype Code Generator",
    description:
      "Automatically convert ML research papers into working prototype code with standardized APIs.",
    type: "website",
    url: "https://papercode.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperCode — ML Paper to Prototype Code Generator",
    description:
      "Automatically convert ML research papers into working prototype code with standardized APIs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} font-mono bg-gray-950 text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
