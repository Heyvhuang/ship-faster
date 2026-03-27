import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PromptFlow — Cut AI Prompt Waste by 40% for Python Teams",
  description:
    "PromptFlow scans your Python team's LLM prompt patterns, scores efficiency, and delivers optimized templates. 127 teams audited. 31 min saved per dev per day. Free 5-minute setup.",
  openGraph: {
    title: "PromptFlow — Cut AI Prompt Waste by 40% for Python Teams",
    description:
      "127 Python teams audited. 40% faster code generation with optimized prompt templates for Django and Flask.",
    type: "website",
    url: siteUrl,
    siteName: "PromptFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptFlow — AI Prompt Optimizer for Python Teams",
    description:
      "40% faster code generation. 31 min saved per dev per day. Free team audit.",
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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does PromptFlow analyze my team's prompts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PromptFlow integrates with your IDE (VS Code, PyCharm, Cursor) and captures prompt-to-output data. We score each prompt on efficiency, specificity, and success rate, then surface patterns across your team.",
        },
      },
      {
        "@type": "Question",
        name: "How long until we see results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most teams see measurable improvement within 2 weeks. The initial audit takes 5 minutes to set up.",
        },
      },
      {
        "@type": "Question",
        name: "Is my team's code or prompt data shared?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Prompt data is analyzed in aggregate and never leaves your workspace. You can self-host the analysis engine on Enterprise plans.",
        },
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PromptFlow",
    applicationCategory: "DeveloperApplication",
    description:
      "AI prompt optimization tool for Python development teams. Analyzes LLM prompting patterns and delivers data-driven workflow improvements.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free team audit",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
