import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarbCoach — AI Carb Counting for Diabetics",
  description:
    "Log your meal in 10 seconds, not 5 minutes. AI-powered photo nutrition coach built exclusively for insulin-dependent diabetics who count every carb for dosing.",
  openGraph: {
    title: "CarbCoach — AI Carb Counting for Diabetics",
    description:
      "Snap a photo. Get instant carb counts. Calculate your insulin dose in seconds.",
    type: "website",
    url: "https://carbcoach.ai",
    siteName: "CarbCoach",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarbCoach — AI Carb Counting for Diabetics",
    description:
      "Snap a photo. Get instant carb counts. Calculate your insulin dose in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
