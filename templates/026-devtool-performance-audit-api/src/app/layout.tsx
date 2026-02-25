import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoreScope — Apple Silicon Build Performance Audit API",
  description:
    "Stop wasting P-cores on linking jobs. CoreScope analyzes E-core vs P-core bottlenecks in your CI/CD builds and delivers specific compiler flag and parallelization fixes for Xcode, Swift, and Objective-C projects.",
  openGraph: {
    title: "CoreScope — Apple Silicon Build Performance Audit API",
    description:
      "Analyze E-core vs P-core bottlenecks in CI builds. Get specific compiler flag and parallelization fixes.",
    type: "website",
    url: "https://corescope.dev",
    siteName: "CoreScope",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreScope — Apple Silicon Build Performance Audit API",
    description:
      "Analyze E-core vs P-core bottlenecks in CI builds. Get specific compiler flag and parallelization fixes.",
  },
  keywords: [
    "Apple Silicon",
    "CI/CD",
    "build optimization",
    "Xcode",
    "Swift",
    "performance",
    "E-core",
    "P-core",
    "GitHub Actions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
