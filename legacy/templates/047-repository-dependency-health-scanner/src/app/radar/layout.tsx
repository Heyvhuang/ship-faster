import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RadarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
