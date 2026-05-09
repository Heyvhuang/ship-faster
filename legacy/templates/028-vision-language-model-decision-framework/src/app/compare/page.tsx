"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { models, useCases } from "@/data/models";

function CompareContent() {
  const searchParams = useSearchParams();
  const modelIds = (searchParams.get("models") || "").split(",").filter(Boolean);
  const useCaseId = searchParams.get("useCase") || "object-detection";

  const selectedModels = modelIds
    .map((id) => models.find((m) => m.id === id))
    .filter(Boolean);

  const useCase = useCases.find((uc) => uc.id === useCaseId);

  if (selectedModels.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Select at least 2 models to compare</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            &larr; Back to selector
          </Link>
        </div>
      </div>
    );
  }

  type ModelType = (typeof models)[0];
  const specs: { label: string; render: (m: ModelType) => string }[] = [
    { label: "Provider", render: (m) => m.provider },
    { label: "Parameters", render: (m) => m.params },
    {
      label: "Model Size",
      render: (m) =>
        m.size >= 1000 ? `${(m.size / 1000).toFixed(1)} GB` : `${m.size} MB`,
    },
    { label: "Latency", render: (m) => `${m.latency} ms` },
    {
      label: "Memory",
      render: (m) =>
        m.memoryUsage >= 1000
          ? `${(m.memoryUsage / 1000).toFixed(1)} GB`
          : `${m.memoryUsage} MB`,
    },
    { label: "Power Draw", render: (m) => `${m.powerDraw} W` },
    { label: "Edge Ready", render: (m) => (m.edgeReady ? "Yes" : "No") },
    { label: "Hardware Support", render: (m) => m.hardware.join(", ") },
  ];

  // Find best values for highlighting
  const bestLatency = Math.min(...selectedModels.map((m) => m!.latency));
  const bestMemory = Math.min(...selectedModels.map((m) => m!.memoryUsage));
  const bestAccuracy = Math.max(
    ...selectedModels.map((m) => m!.accuracy[useCaseId] || 0)
  );

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
              V
            </div>
            <span className="font-semibold text-lg">Model Comparison</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Side-by-Side Comparison</h1>
        <p className="text-gray-400 mb-8">
          Comparing for{" "}
          <span className="text-white font-medium">{useCase?.name}</span>
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 pr-4 text-gray-500 font-medium w-40">
                  Specification
                </th>
                {selectedModels.map((m) => (
                  <th
                    key={m!.id}
                    className="text-left py-3 px-4 font-semibold font-mono"
                  >
                    {m!.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.label} className="border-b border-gray-800/50">
                  <td className="py-3 pr-4 text-gray-500">{spec.label}</td>
                  {selectedModels.map((m) => (
                    <td key={m!.id} className="py-3 px-4 font-mono text-gray-300">
                      {spec.render(m!)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Accuracy row - highlighted */}
              <tr className="border-b border-gray-800/50 bg-blue-950/20">
                <td className="py-3 pr-4 text-blue-400 font-medium">
                  {useCase?.name} Accuracy
                </td>
                {selectedModels.map((m) => {
                  const acc = m!.accuracy[useCaseId] || 0;
                  return (
                    <td
                      key={m!.id}
                      className={`py-3 px-4 font-mono font-bold ${
                        acc === bestAccuracy ? "text-blue-400" : "text-gray-300"
                      }`}
                    >
                      {acc}
                      {acc === bestAccuracy && (
                        <span className="ml-2 text-xs font-normal text-blue-500">
                          Best
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* All accuracy scores */}
              {useCases
                .filter((uc) => uc.id !== useCaseId)
                .map((uc) => (
                  <tr key={uc.id} className="border-b border-gray-800/50">
                    <td className="py-3 pr-4 text-gray-500">
                      {uc.name} Accuracy
                    </td>
                    {selectedModels.map((m) => (
                      <td
                        key={m!.id}
                        className="py-3 px-4 font-mono text-gray-400"
                      >
                        {m!.accuracy[uc.id] || 0}
                      </td>
                    ))}
                  </tr>
                ))}

              {/* Strengths */}
              <tr className="border-b border-gray-800/50">
                <td className="py-3 pr-4 text-green-400 font-medium align-top">
                  Strengths
                </td>
                {selectedModels.map((m) => (
                  <td key={m!.id} className="py-3 px-4 text-gray-300">
                    <ul className="space-y-1">
                      {m!.strengths.map((s) => (
                        <li key={s} className="flex items-start gap-1">
                          <span className="text-green-500">+</span> {s}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Weaknesses */}
              <tr className="border-b border-gray-800/50">
                <td className="py-3 pr-4 text-red-400 font-medium align-top">
                  Trade-offs
                </td>
                {selectedModels.map((m) => (
                  <td key={m!.id} className="py-3 px-4 text-gray-300">
                    <ul className="space-y-1">
                      {m!.weaknesses.map((w) => (
                        <li key={w} className="flex items-start gap-1">
                          <span className="text-red-500">-</span> {w}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Visual bar chart for key metrics */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Visual Comparison</h2>
          <div className="space-y-8">
            {[
              {
                label: "Accuracy",
                getValue: (m: (typeof models)[0]) => m.accuracy[useCaseId] || 0,
                max: 100,
                best: bestAccuracy,
                unit: "",
                higherBetter: true,
              },
              {
                label: "Latency",
                getValue: (m: (typeof models)[0]) => m.latency,
                max: 300,
                best: bestLatency,
                unit: "ms",
                higherBetter: false,
              },
              {
                label: "Memory",
                getValue: (m: (typeof models)[0]) => m.memoryUsage,
                max: 16000,
                best: bestMemory,
                unit: "MB",
                higherBetter: false,
              },
            ].map((metric) => (
              <div key={metric.label}>
                <h3 className="text-sm text-gray-400 mb-3">
                  {metric.label}
                  <span className="text-gray-600 ml-2 text-xs">
                    ({metric.higherBetter ? "higher" : "lower"} is better)
                  </span>
                </h3>
                <div className="space-y-2">
                  {selectedModels.map((m) => {
                    const val = metric.getValue(m!);
                    const pct = Math.min((val / metric.max) * 100, 100);
                    const isBest = val === metric.best;
                    return (
                      <div key={m!.id} className="flex items-center gap-3">
                        <span className="w-32 text-sm font-mono text-gray-300 shrink-0 truncate">
                          {m!.name}
                        </span>
                        <div className="flex-1 bg-gray-800 rounded-full h-6 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isBest ? "bg-blue-500" : "bg-gray-600"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span
                          className={`w-20 text-sm font-mono text-right ${
                            isBest ? "text-blue-400" : "text-gray-400"
                          }`}
                        >
                          {val}
                          {metric.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HuggingFace links */}
        <div className="mt-12 flex flex-wrap gap-3">
          {selectedModels.map((m) => (
            <a
              key={m!.id}
              href={m!.huggingFaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 hover:border-gray-600 rounded-lg text-sm transition-colors"
            >
              <span className="font-mono">{m!.name}</span>
              <span className="text-gray-500">on HuggingFace &rarr;</span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Loading comparison...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
