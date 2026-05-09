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
  title: "ShieldIvanti — Ivanti EPMM Backdoor Detection & Removal",
  description:
    "Emergency cybersecurity service detecting and removing dormant 403.jsp backdoors from Ivanti EPMM systems. 24-hour emergency response for enterprise security teams.",
  openGraph: {
    title: "ShieldIvanti — Ivanti EPMM Backdoor Detection & Removal",
    description:
      "Emergency cybersecurity service detecting and removing dormant 403.jsp backdoors from Ivanti EPMM systems.",
    type: "website",
    url: "https://shieldivanti.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShieldIvanti — Ivanti EPMM Backdoor Detection & Removal",
    description:
      "Emergency cybersecurity service detecting and removing dormant 403.jsp backdoors from Ivanti EPMM systems.",
  },
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
