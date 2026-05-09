export function CommitGrid({ className = "" }: { className?: string }) {
  // Generate a GitHub-style contribution grid
  const weeks = 20;
  const days = 7;
  const levels = [
    "bg-gray-800",
    "bg-green-900",
    "bg-green-700",
    "bg-green-500",
    "bg-green-400",
  ];

  const cells: string[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: string[] = [];
    for (let d = 0; d < days; d++) {
      const r = Math.sin(w * 0.7 + d * 1.3) * 0.5 + 0.5;
      const idx = Math.floor(r * levels.length);
      week.push(levels[Math.min(idx, levels.length - 1)]);
    }
    cells.push(week);
  }

  return (
    <div className={`flex gap-[3px] ${className}`}>
      {cells.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((color, di) => (
            <div
              key={di}
              className={`h-[11px] w-[11px] rounded-sm ${color}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
