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
  title: "PromptFlow — Code Generation Workflow Optimizer",
  description:
    "Analyze and optimize your team's AI coding prompts. Measure prompt efficiency, reduce trial-and-error, and accelerate Python development with data-driven insights.",
  openGraph: {
    title: "PromptFlow — Code Generation Workflow Optimizer",
    description:
      "Optimize your team's AI coding prompts for 40% faster code generation. Built for Python development teams using Django and Flask.",
    type: "website",
    url: "https://promptflow.dev",
    siteName: "PromptFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptFlow — Code Generation Workflow Optimizer",
    description:
      "Optimize your team's AI coding prompts for 40% faster code generation.",
  },
  keywords: [
    "AI coding",
    "prompt optimization",
    "Python development",
    "code generation",
    "team productivity",
    "Django",
    "Flask",
    "LLM workflow",
  ],
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
