import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'UnitEconomics Console',
  description: 'Unit economics analysis and policy drafting app for AI SaaS teams.',
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'UnitEconomics Console',
    description: 'Unit economics analysis and policy drafting app for AI SaaS teams.',
    url: '/',
    siteName: 'UnitEconomics Console',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnitEconomics Console',
    description: 'Unit economics analysis and policy drafting app for AI SaaS teams.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UnitEconomics Console',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Unit economics analysis and policy drafting app for AI SaaS teams.',
  offers: {
    '@type': 'Offer',
    price: '49',
    priceCurrency: 'USD',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        background: '#FAFAFA',
        foreground: '#0F172A',
        muted: '#F1F5F9',
        'muted-foreground': '#64748B',
        accent: '#0052FF',
        'accent-secondary': '#4D7CFF',
        'accent-foreground': '#FFFFFF',
        border: '#E2E8F0',
        card: '#FFFFFF',
        ring: '#0052FF',
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
      backgroundImage: {
        'signature-gradient': 'linear-gradient(to right, #0052FF, #4D7CFF)',
      }
    },
  },
};`}
        </Script>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
