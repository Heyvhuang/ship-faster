import ConsoleLayout from "@/components/ConsoleLayout";

const failure = {
  id: "F-29481",
  time: "2026-02-24 08:42:17 UTC",
  model: "hubert-base-ls960",
  type: "Misclassification",
  confidence: 0.34,
  expected: "speech",
  predicted: "music",
  duration: "4.2s",
  sampleRate: "16kHz",
};

const saeFeatures = [
  { name: "background_noise_level", activation: 0.92, direction: "positive", desc: "High ambient noise detected in 200-800Hz range" },
  { name: "speech_energy_ratio", activation: 0.78, direction: "negative", desc: "Low speech energy relative to total signal energy" },
  { name: "spectral_flatness", activation: 0.71, direction: "positive", desc: "Unusual spectral flatness suggesting non-speech content" },
  { name: "zero_crossing_rate", activation: 0.65, direction: "positive", desc: "Elevated zero crossing rate in frames 40-120" },
  { name: "mfcc_variance", activation: 0.54, direction: "negative", desc: "Low MFCC coefficient variance across segments" },
  { name: "pitch_continuity", activation: 0.41, direction: "negative", desc: "Discontinuous pitch contour detected" },
  { name: "harmonic_content", activation: 0.38, direction: "positive", desc: "Strong harmonic structure resembling musical content" },
  { name: "onset_density", activation: 0.29, direction: "positive", desc: "Multiple rapid onsets in short time window" },
];

const allFailures = [
  { id: "F-29481", time: "08:42", model: "hubert-base-ls960", type: "Misclassification", topFeature: "background_noise_level", conf: "0.34" },
  { id: "F-29480", time: "08:39", model: "whisper-large-v3", type: "Hallucination", topFeature: "low_snr_segment", conf: "0.12" },
  { id: "F-29479", time: "08:36", model: "hubert-base-ls960", type: "Timeout", topFeature: "long_silence_padding", conf: "—" },
  { id: "F-29478", time: "08:33", model: "whisper-large-v3", type: "Wrong language", topFeature: "accent_pattern_mismatch", conf: "0.67" },
  { id: "F-29477", time: "08:30", model: "whisper-medium-en", type: "Truncation", topFeature: "clipping_distortion", conf: "0.45" },
  { id: "F-29476", time: "08:24", model: "hubert-base-ls960", type: "Misclassification", topFeature: "reverb_level", conf: "0.29" },
  { id: "F-29475", time: "08:18", model: "whisper-large-v3", type: "Hallucination", topFeature: "silence_ratio", conf: "0.08" },
];

export default function FailureAnalysis() {
  return (
    <ConsoleLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Failure Analysis</h1>
          <p className="text-sm text-muted">SAE feature breakdown for model failures</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Failure list */}
          <div className="bg-card border border-card-border rounded-xl p-5">
            <h2 className="font-semibold text-sm mb-4">Failures Today</h2>
            <div className="space-y-2">
              {allFailures.map((f) => (
                <div
                  key={f.id}
                  className={`p-3 rounded-lg text-sm cursor-pointer transition-colors ${
                    f.id === "F-29481" ? "bg-accent-blue/10 border border-accent-blue/30" : "bg-background hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs">{f.id}</span>
                    <span className="text-xs text-muted">{f.time}</span>
                  </div>
                  <div className="text-xs text-muted mt-1">{f.model}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-accent-red">{f.type}</span>
                    <span className="text-xs font-mono text-accent-purple">{f.topFeature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail view */}
          <div className="lg:col-span-2 space-y-6">
            {/* Failure info */}
            <div className="bg-card border border-card-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-accent-red text-lg">●</span>
                  <div>
                    <h2 className="font-semibold">{failure.id} — {failure.type}</h2>
                    <p className="text-xs text-muted">{failure.time}</p>
                  </div>
                </div>
                <span className="text-xs bg-accent-red/10 text-accent-red px-2 py-1 rounded">{failure.type}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Model", value: failure.model },
                  { label: "Confidence", value: String(failure.confidence) },
                  { label: "Expected", value: failure.expected },
                  { label: "Predicted", value: failure.predicted },
                  { label: "Duration", value: failure.duration },
                  { label: "Sample Rate", value: failure.sampleRate },
                ].map((d) => (
                  <div key={d.label}>
                    <div className="text-xs text-muted">{d.label}</div>
                    <div className="font-mono text-sm">{d.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Waveform mock */}
            <div className="bg-card border border-card-border rounded-xl p-5">
              <h2 className="font-semibold text-sm mb-4">Audio Waveform with Failure Annotations</h2>
              <div className="relative bg-background rounded-lg p-4 h-32">
                <div className="absolute inset-x-4 top-4 bottom-4 flex items-center">
                  {Array.from({ length: 80 }).map((_, i) => {
                    const h = Math.abs(Math.sin(i * 0.3) * Math.cos(i * 0.1) * 100);
                    const isFailure = i >= 32 && i <= 48;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center justify-center h-full">
                        <div
                          className={`w-full rounded-sm ${isFailure ? "bg-accent-red/80" : "bg-accent-blue/40"}`}
                          style={{ height: `${Math.max(h, 4)}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="absolute top-2 right-3 text-xs text-accent-red font-mono">▼ failure region</div>
              </div>
              <div className="flex justify-between text-xs text-muted mt-2">
                <span>0.0s</span><span>1.0s</span><span>2.0s</span><span>3.0s</span><span>4.2s</span>
              </div>
            </div>

            {/* SAE Features */}
            <div className="bg-card border border-card-border rounded-xl p-5">
              <h2 className="font-semibold text-sm mb-1">SAE Feature Decomposition</h2>
              <p className="text-xs text-muted mb-4">Top contributing features to this failure, ranked by activation strength</p>
              <div className="space-y-3">
                {saeFeatures.map((f) => (
                  <div key={f.name} className="bg-background rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-accent-purple">{f.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          f.direction === "positive" ? "bg-accent-red/10 text-accent-red" : "bg-accent-blue/10 text-accent-blue"
                        }`}>
                          {f.direction}
                        </span>
                      </div>
                      <span className="font-mono text-sm">{f.activation.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-card-border rounded-full h-1.5 mb-1">
                      <div
                        className={`h-1.5 rounded-full ${f.activation > 0.7 ? "bg-accent-red" : f.activation > 0.4 ? "bg-accent-orange" : "bg-accent-blue"}`}
                        style={{ width: `${f.activation * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
