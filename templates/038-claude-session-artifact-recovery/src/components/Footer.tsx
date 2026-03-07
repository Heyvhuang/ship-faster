export default function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-sm text-muted">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-mono">
          <span className="text-accent">{">"}</span> SessionRecover &copy; {new Date().getFullYear()}
        </p>
        <p className="mt-2">All processing happens locally. Your code never leaves your machine.</p>
      </div>
    </footer>
  );
}
