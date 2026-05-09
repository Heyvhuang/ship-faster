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
  title: "InfraRegrets — Startup Infrastructure Decision Database",
  description:
    "Searchable database of startup infrastructure decisions with regret ratings and real advice from founders. Find out which databases, clouds, and tools actually work.",
  openGraph: {
    title: "InfraRegrets — Startup Infrastructure Decision Database",
    description:
      "Searchable database of startup infrastructure decisions with regret ratings and real advice from founders.",
    type: "website",
    siteName: "InfraRegrets",
  },
  twitter: {
    card: "summary_large_image",
    title: "InfraRegrets — Startup Infrastructure Decision Database",
    description:
      "Searchable database of startup infrastructure decisions with regret ratings and real advice from founders.",
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
        <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-900">
                Infra<span className="text-red-500">Regrets</span>
              </span>
            </a>
            <div className="flex items-center gap-4 sm:gap-6 text-sm">
              <a
                href="/#browse"
                className="text-slate-600 hover:text-slate-900 hidden sm:block"
              >
                Browse
              </a>
              <a
                href="/submit"
                className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors font-medium"
              >
                Submit Decision
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-slate-200 bg-white mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">
                  Infra<span className="text-red-500">Regrets</span>
                </span>
                <p className="text-sm text-slate-500 mt-1">
                  Real infrastructure decisions. Real regret scores.
                </p>
              </div>
              <div className="flex gap-6 text-sm text-slate-500">
                <a href="/" className="hover:text-slate-900">
                  Home
                </a>
                <a href="/submit" className="hover:text-slate-900">
                  Submit
                </a>
                <a href="/pricing" className="hover:text-slate-900">
                  Pricing
                </a>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-6">
              © 2025 InfraRegrets. Built with Next.js on Vercel, naturally.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
