import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function RadarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-[73px]">{children}</main>
      <Footer />
    </>
  );
}
