import { Paper } from "../data/issues";

export function PaperCard({ paper }: { paper: Paper }) {
  return (
    <div
      className="rounded-xl border p-5 sm:p-6"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            backgroundColor:
              paper.category === "generation"
                ? "var(--accent-bg)"
                : "rgba(99,102,241,0.1)",
            color:
              paper.category === "generation"
                ? "var(--accent)"
                : "#818cf8",
          }}
        >
          {paper.category}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: "var(--muted)" }}
        >
          {paper.modelName}
          {paper.modelSize && ` · ${paper.modelSize}`}
        </span>
      </div>

      <h3 className="font-semibold text-base sm:text-lg mb-1">{paper.title}</h3>
      <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
        {paper.summary}
      </p>

      {/* Benchmarks */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr
              className="text-left text-xs"
              style={{ color: "var(--muted)" }}
            >
              <th className="pb-1 pr-4 font-medium">Metric</th>
              <th className="pb-1 pr-4 font-medium">Score</th>
              <th className="pb-1 font-medium">Δ</th>
            </tr>
          </thead>
          <tbody>
            {paper.benchmarks.map((b) => (
              <tr key={b.metric} className="border-t" style={{ borderColor: "var(--card-border)" }}>
                <td className="py-1.5 pr-4">{b.metric}</td>
                <td className="py-1.5 pr-4 font-semibold">{b.score}</td>
                <td className="py-1.5">
                  {b.delta && (
                    <span style={{ color: "var(--accent)" }}>{b.delta}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Links */}
      <div className="flex gap-3 text-sm">
        <a
          href={paper.arxivUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
          style={{ color: "var(--primary)" }}
        >
          📄 arXiv
        </a>
        <a
          href={paper.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
          style={{ color: "var(--primary)" }}
        >
          {paper.repoType === "github" ? "🔗 GitHub" : "🤗 HuggingFace"}
        </a>
        {paper.dataset && (
          <span className="text-xs self-center" style={{ color: "var(--muted)" }}>
            Dataset: {paper.dataset}
          </span>
        )}
      </div>
    </div>
  );
}
