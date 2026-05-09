"use client";

import { useState, useMemo } from "react";
import {
  useCases,
  hardwareOptions,
  rankModels,
  type Constraints,
  type RankedModel,
} from "@/data/models";
import Link from "next/link";

function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
            V
          </div>
          <span className="font-semibold text-lg">VLM Selector</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
          <a href="#use-cases" className="hover:text-white transition-colors">
            Use Cases
          </a>
          <a href="#constraints" className="hover:text-white transition-colors">
            Constraints
          </a>
          <a href="#results" className="hover:text-white transition-colors">
            Results
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/50 text-blue-400 text-xs font-medium mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        Edge-first model selection
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
        Find Your Perfect VLM
        <br />
        <span className="text-blue-500">in 30 Seconds</span>
      </h1>
      <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
        Stop guessing. Input your constraints — latency, memory, hardware — and
        get ranked model recommendations with trade-off explanations.
      </p>
      <a
        href="#use-cases"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
      >
        Start Decision Tree
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
    </section>
  );
}

function UseCaseSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section id="use-cases" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <span className="text-blue-500 text-sm font-medium tracking-wide uppercase">
          Step 1
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-1">
          Select Your Use Case
        </h2>
        <p className="text-gray-400 mt-2">
          Choose the primary vision-language task for your application.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((uc) => (
          <button
            key={uc.id}
            onClick={() => onSelect(uc.id)}
            className={`text-left p-5 rounded-xl border transition-all ${
              selected === uc.id
                ? "border-blue-500 bg-blue-950/30 ring-1 ring-blue-500/50"
                : "border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900"
            }`}
          >
            <div className="text-2xl mb-2">{uc.icon}</div>
            <h3 className="font-semibold mb-1">{uc.name}</h3>
            <p className="text-sm text-gray-400">{uc.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              Key metric: {uc.keyMetric}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

function ConstraintInputs({
  constraints,
  onChange,
}: {
  constraints: Constraints;
  onChange: (c: Constraints) => void;
}) {
  return (
    <section id="constraints" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <span className="text-blue-500 text-sm font-medium tracking-wide uppercase">
          Step 2
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-1">
          Set Your Constraints
        </h2>
        <p className="text-gray-400 mt-2">
          Define the hard limits for your deployment environment.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
        {/* Latency */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm">
            <span className="font-medium">Max Latency</span>
            <span className="font-mono text-blue-400">
              {constraints.maxLatency}ms
            </span>
          </label>
          <input
            type="range"
            min={20}
            max={500}
            step={10}
            value={constraints.maxLatency}
            onChange={(e) =>
              onChange({ ...constraints, maxLatency: Number(e.target.value) })
            }
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>20ms (real-time)</span>
            <span>500ms (batch)</span>
          </div>
        </div>

        {/* Memory */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm">
            <span className="font-medium">Max Memory</span>
            <span className="font-mono text-blue-400">
              {constraints.maxMemory >= 1000
                ? `${(constraints.maxMemory / 1000).toFixed(1)}GB`
                : `${constraints.maxMemory}MB`}
            </span>
          </label>
          <input
            type="range"
            min={500}
            max={16000}
            step={500}
            value={constraints.maxMemory}
            onChange={(e) =>
              onChange({ ...constraints, maxMemory: Number(e.target.value) })
            }
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>500MB</span>
            <span>16GB</span>
          </div>
        </div>

        {/* Power */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm">
            <span className="font-medium">Max Power Draw</span>
            <span className="font-mono text-blue-400">
              {constraints.maxPower}W
            </span>
          </label>
          <input
            type="range"
            min={3}
            max={50}
            step={1}
            value={constraints.maxPower}
            onChange={(e) =>
              onChange({ ...constraints, maxPower: Number(e.target.value) })
            }
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>3W (mobile)</span>
            <span>50W (desktop GPU)</span>
          </div>
        </div>

        {/* Hardware */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Hardware</label>
          <select
            value={constraints.hardware}
            onChange={(e) =>
              onChange({ ...constraints, hardware: e.target.value })
            }
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            {hardwareOptions.map((hw) => (
              <option key={hw.id} value={hw.id}>
                {hw.name} — {hw.description}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

function MatchBadge({ match }: { match: boolean }) {
  return match ? (
    <span className="text-xs px-2 py-0.5 rounded-full bg-green-950 text-green-400 border border-green-800/50">
      Pass
    </span>
  ) : (
    <span className="text-xs px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800/50">
      Fail
    </span>
  );
}

function ResultCard({
  ranked,
  rank,
  useCase,
  onCompare,
  isCompared,
}: {
  ranked: RankedModel;
  rank: number;
  useCase: string;
  onCompare: (id: string) => void;
  isCompared: boolean;
}) {
  const { model, matchDetails } = ranked;
  const allPass =
    matchDetails.latencyMatch &&
    matchDetails.memoryMatch &&
    matchDetails.powerMatch &&
    matchDetails.hardwareMatch;

  return (
    <div
      className={`rounded-xl border p-5 transition-all ${
        allPass
          ? "border-gray-700 bg-gray-900/70"
          : "border-gray-800/50 bg-gray-900/30 opacity-70"
      } ${rank === 0 && allPass ? "ring-1 ring-blue-500/40 border-blue-800/50" : ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {rank === 0 && allPass && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/50 font-medium">
                Top Pick
              </span>
            )}
            {model.edgeReady && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700/50">
                Edge Ready
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold font-mono">{model.name}</h3>
          <p className="text-sm text-gray-400">{model.provider}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">
            {matchDetails.accuracyScore}
          </div>
          <div className="text-xs text-gray-500">accuracy</div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4">{model.description}</p>

      {/* Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-gray-800/50 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-500 mb-0.5">Latency</div>
          <div className="font-mono text-sm">{model.latency}ms</div>
          <MatchBadge match={matchDetails.latencyMatch} />
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-500 mb-0.5">Memory</div>
          <div className="font-mono text-sm">
            {model.memoryUsage >= 1000
              ? `${(model.memoryUsage / 1000).toFixed(1)}GB`
              : `${model.memoryUsage}MB`}
          </div>
          <MatchBadge match={matchDetails.memoryMatch} />
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-500 mb-0.5">Power</div>
          <div className="font-mono text-sm">{model.powerDraw}W</div>
          <MatchBadge match={matchDetails.powerMatch} />
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-500 mb-0.5">Hardware</div>
          <div className="font-mono text-sm">{model.params}</div>
          <MatchBadge match={matchDetails.hardwareMatch} />
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <h4 className="text-green-400 font-medium text-xs mb-1 uppercase tracking-wide">
            Strengths
          </h4>
          <ul className="space-y-0.5 text-gray-400">
            {model.strengths.map((s) => (
              <li key={s} className="flex items-start gap-1">
                <span className="text-green-500 mt-0.5">+</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-red-400 font-medium text-xs mb-1 uppercase tracking-wide">
            Trade-offs
          </h4>
          <ul className="space-y-0.5 text-gray-400">
            {model.weaknesses.map((w) => (
              <li key={w} className="flex items-start gap-1">
                <span className="text-red-500 mt-0.5">-</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
        <a
          href={model.huggingFaceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          View on HuggingFace &rarr;
        </a>
        <button
          onClick={() => onCompare(model.id)}
          className={`ml-auto text-sm px-3 py-1 rounded-lg border transition-colors ${
            isCompared
              ? "border-blue-500 bg-blue-950/50 text-blue-400"
              : "border-gray-700 hover:border-gray-600 text-gray-400"
          }`}
        >
          {isCompared ? "In Comparison" : "Compare"}
        </button>
      </div>
    </div>
  );
}

function Results({
  useCase,
  constraints,
  compareIds,
  onToggleCompare,
}: {
  useCase: string;
  constraints: Constraints;
  compareIds: string[];
  onToggleCompare: (id: string) => void;
}) {
  const ranked = useMemo(
    () => rankModels(useCase, constraints),
    [useCase, constraints]
  );

  const passCount = ranked.filter(
    (r) =>
      r.matchDetails.latencyMatch &&
      r.matchDetails.memoryMatch &&
      r.matchDetails.powerMatch &&
      r.matchDetails.hardwareMatch
  ).length;

  return (
    <section id="results" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-blue-500 text-sm font-medium tracking-wide uppercase">
            Step 3
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">
            Ranked Recommendations
          </h2>
          <p className="text-gray-400 mt-2">
            {passCount} model{passCount !== 1 ? "s" : ""} match all your
            constraints. {passCount === 0 && "Try relaxing your constraints."}
          </p>
        </div>
        {compareIds.length >= 2 && (
          <Link
            href={`/compare?models=${compareIds.join(",")}&useCase=${useCase}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            Compare {compareIds.length} Models &rarr;
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ranked.map((r, i) => (
          <ResultCard
            key={r.model.id}
            ranked={r}
            rank={i}
            useCase={useCase}
            onCompare={onToggleCompare}
            isCompared={compareIds.includes(r.model.id)}
          />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* CTA */}
          <div>
            <h3 className="text-xl font-bold mb-2">
              Need a Custom Decision Framework?
            </h3>
            <p className="text-gray-400 mb-6">
              We build tailored VLM evaluation pipelines and edge deployment
              consulting for engineering teams.
            </p>
            {submitted ? (
              <div className="text-green-400 font-medium">
                Thanks! We&apos;ll be in touch.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubmitted(true);
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@company.com"
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                >
                  Get Early Access
                </button>
              </form>
            )}
          </div>

          {/* Feedback */}
          <div>
            <h3 className="text-xl font-bold mb-2">Feedback</h3>
            <p className="text-gray-400 mb-4">
              Missing a model? Wrong data? Let us know.
            </p>
            <a
              href="mailto:feedback@vlmselector.dev"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              feedback@vlmselector.dev &rarr;
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>&copy; 2026 VLM Selector. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Built for ML Engineers</span>
            <span>10 models &middot; 5 use cases</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [selectedUseCase, setSelectedUseCase] = useState("object-detection");
  const [constraints, setConstraints] = useState<Constraints>({
    maxLatency: 200,
    maxMemory: 8000,
    maxPower: 25,
    hardware: "gpu",
  });
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 3
          ? prev
          : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <UseCaseSelector
        selected={selectedUseCase}
        onSelect={setSelectedUseCase}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-800" />
      </div>
      <ConstraintInputs constraints={constraints} onChange={setConstraints} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-800" />
      </div>
      <Results
        useCase={selectedUseCase}
        constraints={constraints}
        compareIds={compareIds}
        onToggleCompare={toggleCompare}
      />
      <Footer />
    </div>
  );
}
