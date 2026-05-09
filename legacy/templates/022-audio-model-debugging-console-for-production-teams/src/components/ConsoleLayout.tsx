import Sidebar from "./Sidebar";

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:overflow-y-auto pt-12 md:pt-0">
        {children}
      </main>
    </div>
  );
}
