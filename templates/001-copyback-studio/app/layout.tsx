import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "../components/AuthProvider";
import { ToastProvider } from "../components/ToastProvider";

export const metadata = {
  title: "CopyBack Studio",
  description: "A high-density copy round-trip studio for global growth marketers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
