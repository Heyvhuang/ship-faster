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
  title: "Radar — Weekly ML Paper Deep Dives",
  description:
    "Get 3 ML papers explained in 5 minutes each. Curated weekly summaries with actionable insights for researchers.",
  openGraph: {
    title: "Radar — Weekly ML Paper Deep Dives",
    description:
      "Get 3 ML papers explained in 5 minutes each. Curated weekly summaries with actionable insights.",
    type: "website",
    siteName: "Radar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radar — Weekly ML Paper Deep Dives",
    description:
      "Get 3 ML papers explained in 5 minutes each. Curated weekly summaries with actionable insights.",
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
