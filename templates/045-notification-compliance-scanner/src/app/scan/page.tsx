"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ScanPage() {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  function handleFile(name: string) {
    setFileName(name);
    setScanning(true);
    setProgress(0);
    const steps = [10, 25, 40, 55, 70, 85, 95, 100];
    steps.forEach((p, i) => {
      setTimeout(() => {
        setProgress(p);
        if (p === 100) {
          setTimeout(() => router.push("/results"), 500);
        }
      }, (i + 1) * 400);
    });
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="text-3xl font-bold text-center">Upload &amp; Scan</h1>
          <p className="mt-3 text-center text-zinc-400">
            Drag and drop your IPA file or click to browse. We&apos;ll extract notification entitlements and run compliance checks.
          </p>

          {!scanning ? (
            <div
              className={`mt-10 flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                dragging
                  ? "border-green-400 bg-green-400/5"
                  : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file.name);
              }}
              onClick={() => handleFile("MyApp-v2.1.ipa")}
            >
              <svg className="mb-4 text-zinc-500" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-sm text-zinc-400">
                Drop your <span className="font-mono text-green-400">.ipa</span> file here or click to browse
              </p>
              <p className="mt-1 text-xs text-zinc-600">Max 500MB. Files are processed locally and never stored.</p>
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-zinc-800 bg-zinc-900 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 font-mono text-xs text-green-400">
                  IPA
                </div>
                <div>
                  <p className="text-sm font-medium">{fileName}</p>
                  <p className="text-xs text-zinc-500">Scanning...</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 font-mono text-xs">
                <ScanStep label="Extracting Info.plist" done={progress >= 25} active={progress >= 10 && progress < 25} />
                <ScanStep label="Reading notification entitlements" done={progress >= 40} active={progress >= 25 && progress < 40} />
                <ScanStep label="Parsing NSUserNotificationsUsageDescription" done={progress >= 55} active={progress >= 40 && progress < 55} />
                <ScanStep label="Checking UNNotificationPermission usage" done={progress >= 70} active={progress >= 55 && progress < 70} />
                <ScanStep label="Running GDPR rule engine (5 checks)" done={progress >= 85} active={progress >= 70 && progress < 85} />
                <ScanStep label="Running CCPA rule engine (3 checks)" done={progress >= 95} active={progress >= 85 && progress < 95} />
                <ScanStep label="Generating compliance report" done={progress >= 100} active={progress >= 95 && progress < 100} />
              </div>

              <div className="mt-6">
                <div className="h-2 w-full rounded-full bg-zinc-800">
                  <div
                    className="h-2 rounded-full bg-green-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-xs text-zinc-500">{progress}%</p>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-xs text-zinc-500">
              <span className="font-semibold text-zinc-400">Security:</span> Your IPA files are processed entirely in-browser using WebAssembly. No binary data is transmitted to our servers. We only extract metadata necessary for compliance analysis.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ScanStep({ label, done, active }: { label: string; done: boolean; active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {done ? (
        <span className="text-green-400">✓</span>
      ) : active ? (
        <span className="animate-pulse text-yellow-400">●</span>
      ) : (
        <span className="text-zinc-600">○</span>
      )}
      <span className={done ? "text-zinc-400" : active ? "text-zinc-200" : "text-zinc-600"}>
        {label}
      </span>
    </div>
  );
}
