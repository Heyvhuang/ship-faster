import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reproducibility Radar — Score ML Papers by Code Quality",
  description:
    "Rate ML papers on code availability, quality, and setup ease. Filter deployable research in seconds instead of hours.",
  openGraph: {
    title: "Reproducibility Radar",
    description:
      "Score ML papers on code availability, quality, and setup ease.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reproducibility Radar",
    description:
      "Score ML papers on code availability, quality, and setup ease.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-card-border py-8 text-center text-sm text-muted">
          <div className="mx-auto max-w-6xl px-4">
            © 2024 Reproducibility Radar. Built for ML practitioners.
          </div>
        </footer>
      </body>
    </html>
  );
}
