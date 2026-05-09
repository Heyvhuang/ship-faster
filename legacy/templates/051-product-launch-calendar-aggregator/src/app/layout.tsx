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
  title: "LaunchRadar — Product Launch Calendar",
  description: "A unified calendar tracking upcoming product launches across Product Hunt, BetaList, and other discovery platforms. Never miss a launch again.",
  openGraph: {
    title: "LaunchRadar — Product Launch Calendar",
    description: "One calendar view showing every upcoming product launch across all major discovery platforms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchRadar — Product Launch Calendar",
    description: "One calendar view showing every upcoming product launch across all major discovery platforms.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
