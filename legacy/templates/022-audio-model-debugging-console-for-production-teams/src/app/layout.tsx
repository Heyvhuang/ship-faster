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
  title: "AudioSAE Console — Audio Model Debugging for Production Teams",
  description:
    "The only production debugging tool for audio model failure analysis using interpretable SAE features. Debug Whisper, HuBERT, and other audio models in real-time.",
  openGraph: {
    title: "AudioSAE Console — Audio Model Debugging for Production Teams",
    description:
      "Real-time audio model failure detection with SAE-based interpretable feature analysis. Debug Whisper & HuBERT failures instantly.",
    type: "website",
    siteName: "AudioSAE Console",
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioSAE Console — Audio Model Debugging",
    description:
      "Real-time audio model failure detection with SAE-based interpretable feature analysis.",
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
