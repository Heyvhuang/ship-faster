import { getScoreColor, getScoreBg, getScoreLabel } from "@/lib/data";

export function ScoreBadge({
  score,
  size = "md",
}: {
  score: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12 text-lg",
    lg: "h-20 w-20 text-3xl",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizeClasses[size]} ${getScoreBg(score)} flex items-center justify-center rounded-full border font-mono font-bold ${getScoreColor(score)}`}
      >
        {score}
      </div>
      {size === "lg" && (
        <span className={`text-xs font-medium ${getScoreColor(score)}`}>
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
}
