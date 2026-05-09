export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0a0a0f] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            ExfilGuard
          </div>
          <p className="text-sm text-gray-500">
            &copy; 2026 ExfilGuard. Securing AI integrations against data exfiltration.
          </p>
        </div>
      </div>
    </footer>
  );
}
