import { RiskLevel, riskColors, riskBgColors, riskDotColors } from "@/lib/data";

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${riskBgColors[level]} ${riskColors[level]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${riskDotColors[level]}`} />
      {level}
    </span>
  );
}

export function RiskScore({ score }: { score: number }) {
  const color = score >= 80 ? "text-red-500" : score >= 60 ? "text-orange-500" : score >= 30 ? "text-yellow-500" : "text-emerald-500";
  const bg = score >= 80 ? "bg-red-500" : score >= 60 ? "bg-orange-500" : score >= 30 ? "bg-yellow-500" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-16 rounded-full bg-zinc-800 overflow-hidden">
        <div className={`h-full rounded-full ${bg}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-sm font-mono font-medium ${color}`}>{score}</span>
    </div>
  );
}
