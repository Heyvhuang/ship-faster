import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Submit your AI agent details for a comprehensive security audit quote. First audit free for qualifying startups.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
