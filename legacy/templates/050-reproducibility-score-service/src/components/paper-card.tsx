import Link from "next/link";
import type { Paper } from "@/lib/data";
import { getScoreColor } from "@/lib/data";
import { ScoreBadge } from "./score-badge";

export function PaperCard({ paper }: { paper: Paper }) {
  return (
    <Link
      href={`/papers/${paper.id}`}
      className="group flex gap-4 rounded-lg border border-card-border bg-card p-4 transition-colors hover:border-muted/50"
    >
      <ScoreBadge score={paper.score} />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {paper.title}
        </h3>
        <p className="mt-1 text-sm text-muted truncate">
          {paper.authors.join(", ")} · {paper.venue} {paper.year}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs">
          <DimIndicator label="Code" value={paper.codeAvailability} />
          <DimIndicator label="Quality" value={paper.codeQuality} />
          <DimIndicator label="Setup" value={paper.setupEase} />
        </div>
      </div>
    </Link>
  );
}

function DimIndicator({ label, value }: { label: string; value: number }) {
  return (
    <span className="flex items-center gap-1">
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          value >= 80 ? "bg-green-500" : value >= 60 ? "bg-yellow-500" : "bg-red-500"
        }`}
      />
      <span className="text-muted">
        {label}{" "}
        <span className={`font-mono ${getScoreColor(value)}`}>{value}</span>
      </span>
    </span>
  );
}
