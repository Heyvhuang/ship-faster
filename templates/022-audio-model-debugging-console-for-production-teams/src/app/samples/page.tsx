import ConsoleLayout from "@/components/ConsoleLayout";

const samples = [
  {
    id: "S-8841",
    failureId: "F-29481",
    filename: "call_recording_2026-02-24_084217.wav",
    duration: "4.2s",
    model: "hubert-base-ls960",
    type: "Misclassification",
    topFeature: "background_noise_level",
    confidence: 0.34,
    timestamp: "08:42:17",
  },
  {
    id: "S-8840",
    failureId: "F-29480",
    filename: "podcast_segment_ep142_chunk_38.wav",
    duration: "6.1s",
    model: "whisper-large-v3",
    type: "Hallucination",
    topFeature: "low_snr_segment",
    confidence: 0.12,
    timestamp: "08:39:02",
  },
  {
    id: "S-8839",
    failureId: "F-29479",
    filename: "voicemail_user_29184.wav",
    duration: "12.8s",
    model: "hubert-base-ls960",
    type: "Timeout",
    topFeature: "long_silence_padding",
    confidence: 0,
    timestamp: "08:36:44",
  },
  {
    id: "S-8838",
    failureId: "F-29478",
    filename: "meeting_recording_room3_seg12.wav",
    duration: "8.4s",
    model: "whisper-large-v3",
    type: "Wrong language",
    topFeature: "accent_pattern_mismatch",
    confidence: 0.67,
    timestamp: "08:33:19",
  },
  {
    id: "S-8837",
    failureId: "F-29477",
    filename: "ivr_prompt_customer_18472.wav",
    duration: "3.1s",
    model: "whisper-medium-en",
    type: "Truncation",
    topFeature: "clipping_distortion",
    confidence: 0.45,
    timestamp: "08:30:55",
  },
];

function WaveformMini({ seed }: { seed: number }) {
  return (
    <div className="flex items-center gap-px h-8">
      {Array.from({ length: 40 }).map((_, i) => {
        const h = Math.abs(Math.sin((i + seed) * 0.4) * Math.cos((i + seed) * 0.15) * 100);
        return (
          <div
            key={i}
            className="w-1 bg-accent-blue/40 rounded-sm"
            style={{ height: `${Math.max(h, 8)}%` }}
          />
        );
      })}
    </div>
  );
}

export default function AudioSamples() {
  return (
    <ConsoleLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Audio Samples</h1>
            <p className="text-sm text-muted">Failed audio with visual feature highlights</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-card border border-card-border text-sm rounded-md px-3 py-1.5 text-foreground">
              <option>All models</option>
              <option>whisper-large-v3</option>
              <option>hubert-base-ls960</option>
              <option>whisper-medium-en</option>
            </select>
            <select className="bg-card border border-card-border text-sm rounded-md px-3 py-1.5 text-foreground">
              <option>All failure types</option>
              <option>Misclassification</option>
              <option>Hallucination</option>
              <option>Timeout</option>
              <option>Wrong language</option>
              <option>Truncation</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {samples.map((s, idx) => (
            <div key={s.id} className="bg-card border border-card-border rounded-xl p-5">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Waveform */}
                <div className="md:w-48 shrink-0">
                  <WaveformMini seed={idx * 7} />
                  <div className="flex items-center justify-between mt-2">
                    <button className="w-8 h-8 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm hover:bg-accent-blue/30 transition-colors">
                      ▶
                    </button>
                    <span className="text-xs font-mono text-muted">{s.duration}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm">{s.id}</span>
                    <span className="text-xs text-muted">→ {s.failureId}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      s.type === "Hallucination" || s.type === "Wrong language"
                        ? "bg-accent-red/10 text-accent-red"
                        : s.type === "Timeout"
                        ? "bg-accent-orange/10 text-accent-orange"
                        : "bg-accent-purple/10 text-accent-purple"
                    }`}>
                      {s.type}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-muted truncate mb-2">{s.filename}</div>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div>
                      <span className="text-muted">Model: </span>
                      <span className="font-mono">{s.model}</span>
                    </div>
                    <div>
                      <span className="text-muted">Confidence: </span>
                      <span className="font-mono">{s.confidence || "—"}</span>
                    </div>
                    <div>
                      <span className="text-muted">Time: </span>
                      <span className="font-mono">{s.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Top feature */}
                <div className="shrink-0 text-right">
                  <div className="text-xs text-muted mb-1">Top SAE Feature</div>
                  <div className="font-mono text-sm text-accent-purple">{s.topFeature}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
