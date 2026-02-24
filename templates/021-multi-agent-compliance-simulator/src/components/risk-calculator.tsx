"use client";

import { useState } from "react";

export function RiskCalculator() {
  const [agents, setAgents] = useState(5);
  const [dailyVolume, setDailyVolume] = useState(50);
  const [hasCompliance, setHasCompliance] = useState(false);

  const baseFineRisk = agents * dailyVolume * 2400;
  const reputationCost = baseFineRisk * 3.2;
  const legalCost = agents * 180000;
  const totalRisk = baseFineRisk + reputationCost + legalCost;
  const mitigatedRisk = hasCompliance ? totalRisk * 0.08 : totalRisk;
  const savings = totalRisk - mitigatedRisk;

  const fmt = (n: number) =>
    n >= 1000000
      ? `$${(n / 1000000).toFixed(1)}M`
      : `$${(n / 1000).toFixed(0)}K`;

  return (
    <div className="mx-auto max-w-4xl rounded-xl border border-card-border bg-card p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Number of AI Trading Agents: <span className="text-crimson font-mono">{agents}</span>
            </label>
            <input
              type="range"
              min="2"
              max="50"
              value={agents}
              onChange={(e) => setAgents(Number(e.target.value))}
              className="w-full accent-crimson"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>2</span>
              <span>50</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Daily Trading Volume ($M): <span className="text-crimson font-mono">{dailyVolume}</span>
            </label>
            <input
              type="range"
              min="1"
              max="500"
              value={dailyVolume}
              onChange={(e) => setDailyVolume(Number(e.target.value))}
              className="w-full accent-crimson"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>$1M</span>
              <span>$500M</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasCompliance}
                onChange={(e) => setHasCompliance(e.target.checked)}
                className="accent-crimson h-4 w-4"
              />
              <span className="text-sm">Using AgentGuard pre-deployment simulation</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-sm text-muted mb-4">ANNUAL RISK EXPOSURE</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">SEC Fine Risk</span>
              <span className="font-mono text-sm text-crimson">{fmt(hasCompliance ? baseFineRisk * 0.08 : baseFineRisk)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">Reputation Damage</span>
              <span className="font-mono text-sm text-amber">{fmt(hasCompliance ? reputationCost * 0.08 : reputationCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">Legal & Remediation</span>
              <span className="font-mono text-sm text-amber">{fmt(hasCompliance ? legalCost * 0.08 : legalCost)}</span>
            </div>
            <div className="border-t border-card-border pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Total Risk Exposure</span>
                <span className="font-mono text-lg font-bold text-crimson">{fmt(mitigatedRisk)}</span>
              </div>
            </div>
            {hasCompliance && (
              <div className="rounded-lg bg-emerald/10 border border-emerald/30 p-4 mt-4">
                <p className="text-sm text-emerald font-medium">
                  AgentGuard saves you {fmt(savings)}/year
                </p>
                <p className="text-xs text-emerald/70 mt-1">
                  92% risk reduction through pre-deployment violation detection
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
