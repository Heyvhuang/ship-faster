"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, Clock, Image as ImageIcon, Trash2 } from "lucide-react";
import { notify } from "../lib/ui/toast";
import { LANGUAGES, type RunOutput } from "../lib/types";
import { Skeleton } from "./Skeleton";
import type { Checkpoint } from "./CheckpointBar";

// --- Types ---

type HistoryCheckpoint = {
  id: string;
  run_id: string;
  language_code: string;
  variant_index: number;
  created_at: string;
  output_asset_id: string | null;
  preview_url?: string | null;
};

type SelectableCheckpoint = {
  id: string;
  language_code: string;
  variant_index: number;
  created_at: string;
  output_asset_id: string | null;
};

type HistoryRun = {
  id: string;
  status: string | null;
  stage: string | null;
  created_at: string | null;
  languages: string[] | null;
  checkpoints?: HistoryCheckpoint[];
};

type RunHistorySidebarProps = {
  limit?: number;
  activeRunId?: string | null;
  selectedCheckpointId?: string | null;
  onSelectCheckpoint?: (checkpoint: SelectableCheckpoint) => void;
  onSelectRunPreview?: (payload: RunPreviewPayload) => void;
  onSelectRun?: (runId: string, checkpointId?: string) => void;
  onRunDeleted?: (runId: string) => void;
};

export type RunPreviewPayload = {
  runId: string;
  languages: string[];
  checkpoints: Checkpoint[];
  outputs: RunOutput[];
  selectedCheckpoint: Checkpoint | null;
};

// --- Helpers ---

const formatTimestamp = (timestamp?: string | null) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

const getLanguageLabel = (code: string) => {
  if (code.startsWith("custom:")) {
    return code.replace("custom:", "");
  }
  return LANGUAGES.find((lang) => lang.code === code)?.name || code;
};

const getStatusColor = (status?: string | null) => {
  switch (status) {
    case "done":
      return "text-safe bg-safe/10";
    case "needs_review":
      return "text-amber-600 bg-amber-600/10";
    case "failed":
      return "text-red-600 bg-red-600/10";
    case "queued":
      return "text-blue-600 bg-blue-600/10";
    case "running":
      return "text-accent bg-accent/10";
    default:
      return "text-ink-400 bg-ink-400/10";
  }
};

const getStatusLabel = (status?: string | null) => {
  if (!status) return "unknown";
  return status.replace("_", " ");
};

// --- Sub-components ---

const CheckpointItem = ({
  checkpoint,
  isSelected,
  onClick,
}: {
  checkpoint: HistoryCheckpoint;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const label = useMemo(() => getLanguageLabel(checkpoint.language_code), [checkpoint.language_code]);
  const timestamp = useMemo(() => formatTimestamp(checkpoint.created_at), [checkpoint.created_at]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-all duration-200
        ${isSelected ? "bg-accent/10 ring-1 ring-accent/20" : "hover:bg-ink-50"}
      `}
    >
      <div className="shrink-0">
        {checkpoint.preview_url ? (
          <img
            src={checkpoint.preview_url}
            alt={label}
            className="h-6 w-6 rounded-full object-cover border border-ink-200 bg-white"
            loading="lazy"
          />
        ) : (
          <div className="h-6 w-6 rounded-full border border-ink-200 bg-ink-50 flex items-center justify-center text-ink-400">
            <ImageIcon size={12} />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-ink-800 truncate">
          {label}
          {checkpoint.variant_index > 0 && (
            <span className="ml-1 text-[10px] text-ink-400">v{checkpoint.variant_index + 1}</span>
          )}
        </div>
        <div className="text-[10px] text-ink-400">{timestamp}</div>
      </div>
    </button>
  );
};

const RunItem = ({
  run,
  isActive,
  isExpanded,
  onToggle,
  onSelect,
  onDelete,
  selectedCheckpointId,
  onCheckpointSelect,
  deletingRunId,
}: {
  run: HistoryRun;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: () => void;
  onDelete: (id: string) => void;
  selectedCheckpointId?: string | null;
  onCheckpointSelect: (runId: string, cp: HistoryCheckpoint) => void;
  deletingRunId: string | null;
}) => {
  const checkpoints = useMemo(() => run.checkpoints || [], [run.checkpoints]);
  const languagesCount = run.languages?.length || 0;
  const timestamp = useMemo(() => formatTimestamp(run.created_at), [run.created_at]);
  const isRunning = run.status === "running";
  const statusColors = getStatusColor(run.status);

  return (
    <div className="group/run border-b border-ink-100 last:border-b-0">
      {/* Main clickable area */}
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        className={`w-full text-left px-2 py-2.5 transition-all duration-200
          ${isActive ? "bg-accent/5" : "hover:bg-ink-50"}`}
      >
        <div className="flex items-start gap-1.5">
          {/* Chevron toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`p-1 rounded transition-all duration-200 shrink-0
              ${isActive ? "text-accent" : "text-ink-400 hover:text-ink-600 hover:bg-ink-100"}`}
            aria-label={isExpanded ? "Collapse run" : "Expand run"}
          >
            <ChevronRight
              size={14}
              className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
            />
          </button>

          {/* Content */}
          <div className="min-w-0 flex-1 pt-0.5">
            {/* Title row with timestamp */}
            <div className="flex items-center justify-between gap-2">
              <span className={`text-sm font-semibold truncate ${isActive ? "text-accent" : "text-ink-900"}`}>
                Run <span className="font-mono">{run.id.slice(0, 6)}</span>
              </span>
              <span className="text-[10px] text-ink-400 shrink-0">{timestamp}</span>
            </div>

            {/* Status + language count row */}
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${statusColors}`}>
                {isRunning && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1 animate-pulse" />}
                {getStatusLabel(run.status)}
              </span>
              <span className="text-[10px] text-ink-400">
                {languagesCount} {languagesCount === 1 ? "lang" : "langs"}
              </span>
            </div>
          </div>

          {/* Delete button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(run.id);
            }}
            className={`p-1.5 rounded text-ink-300 transition-all duration-200 shrink-0
              opacity-0 group-hover/run:opacity-100 focus:opacity-100
              ${deletingRunId === run.id ? "bg-red-50 text-red-500 opacity-100" : "hover:bg-red-50 hover:text-red-500"}`}
            disabled={deletingRunId === run.id}
            aria-label="Delete run"
          >
            {deletingRunId === run.id ? (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Trash2 size={14} />
            )}
          </button>
        </div>
      </div>

      {/* Checkpoints list - animated expand/collapse */}
      <div className={`grid transition-all duration-200 ease-in-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="px-2 pb-2 ml-7 space-y-0.5 border-l-2 border-ink-100">
            {checkpoints.length > 0 ? (
              checkpoints.map((checkpoint) => (
                <CheckpointItem
                  key={checkpoint.id}
                  checkpoint={checkpoint}
                  isSelected={isActive && selectedCheckpointId === checkpoint.id}
                  onClick={() => onCheckpointSelect(run.id, checkpoint)}
                />
              ))
            ) : (
              <div className="py-1.5 pl-2 text-[11px] text-ink-400 italic">No outputs yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export function RunHistorySidebar({
  limit = 8,
  activeRunId,
  selectedCheckpointId,
  onSelectCheckpoint,
  onSelectRunPreview,
  onSelectRun,
  onRunDeleted,
}: RunHistorySidebarProps) {
  const [runs, setRuns] = useState<HistoryRun[]>([]);
  const [expandedRunIds, setExpandedRunIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deletingRunId, setDeletingRunId] = useState<string | null>(null);

  // Load runs
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (runs.length === 0) setLoading(true);

      try {
        const response = await fetch(`/api/runs?limit=${limit}`);
        if (!response.ok) return;
        const data = await response.json();
        if (isMounted) {
          const list = Array.isArray(data?.runs) ? data.runs : [];
          setRuns(list);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [limit]);

  // Sync expanded state with active run
  useEffect(() => {
    if (activeRunId) {
      setExpandedRunIds((prev) => {
        if (prev.has(activeRunId)) return prev;
        const next = new Set(prev);
        next.add(activeRunId);
        return next;
      });
    }
  }, [activeRunId]);

  const toggleRun = (runId: string) => {
    setExpandedRunIds((prev) => {
      const next = new Set(prev);
      if (next.has(runId)) {
        next.delete(runId);
      } else {
        next.add(runId);
      }
      return next;
    });
  };

  const handleRunSelect = (run: HistoryRun) => {
    setExpandedRunIds((prev) => {
      const next = new Set(prev);
      next.add(run.id);
      return next;
    });
    if (onSelectRunPreview) {
      const checkpoints = (run.checkpoints || []) as HistoryCheckpoint[];
      onSelectRunPreview({
        runId: run.id,
        languages: run.languages || [],
        checkpoints: checkpoints.map((checkpoint) => ({
          id: checkpoint.id,
          language_code: checkpoint.language_code,
          variant_index: checkpoint.variant_index,
          created_at: checkpoint.created_at,
          output_asset_id: checkpoint.output_asset_id,
        })),
        outputs: checkpoints.map((checkpoint) => ({
          id: checkpoint.id,
          language_code: checkpoint.language_code,
          variant_index: checkpoint.variant_index,
          created_at: checkpoint.created_at,
          asset: checkpoint.preview_url ? { public_url: checkpoint.preview_url } : null,
        })),
        selectedCheckpoint: null,
      });
    }
    if (onSelectRun) {
      onSelectRun(run.id);
    }
  };

  const handleCheckpointSelect = (runId: string, checkpoint: HistoryCheckpoint) => {
    if (activeRunId && runId === activeRunId && onSelectCheckpoint) {
      onSelectCheckpoint(checkpoint);
      return;
    }
    if (onSelectRunPreview) {
      const run = runs.find((item) => item.id === runId) ?? null;
      const checkpoints = ((run?.checkpoints || []) as HistoryCheckpoint[]).map((cp) => ({
        id: cp.id,
        language_code: cp.language_code,
        variant_index: cp.variant_index,
        created_at: cp.created_at,
        output_asset_id: cp.output_asset_id,
      }));
      onSelectRunPreview({
        runId,
        languages: run?.languages || [],
        checkpoints,
        outputs: ((run?.checkpoints || []) as HistoryCheckpoint[]).map((cp) => ({
          id: cp.id,
          language_code: cp.language_code,
          variant_index: cp.variant_index,
          created_at: cp.created_at,
          asset: cp.preview_url ? { public_url: cp.preview_url } : null,
        })),
        selectedCheckpoint: {
          id: checkpoint.id,
          language_code: checkpoint.language_code,
          variant_index: checkpoint.variant_index,
          created_at: checkpoint.created_at,
          output_asset_id: checkpoint.output_asset_id,
        },
      });
    }
    if (onSelectRun) {
      onSelectRun(runId, checkpoint.id);
    }
  };

  const handleDeleteRun = (runId: string) => {
    notify.confirm({
      title: "Delete this run?",
      description: "This will permanently remove all associated assets and history records.",
      action: {
        label: "Delete",
        onClick: async () => {
          setDeletingRunId(runId);
          const previousRuns = runs;
          setRuns((prev) => prev.filter((r) => r.id !== runId));

          try {
            const response = await fetch(`/api/runs/${runId}`, { method: "DELETE" });
            if (!response.ok) {
              const data = await response.json().catch(() => ({}));
              throw new Error(data?.error || "Failed");
            }
            if (onRunDeleted) onRunDeleted(runId);
            notify.success("Run deleted");
            setExpandedRunIds((prev) => {
              const next = new Set(prev);
              next.delete(runId);
              return next;
            });
          } catch (error) {
            setRuns(previousRuns);
            notify.error("Delete failed", "Could not delete the run. Please try again.");
            console.error(error);
          } finally {
            setDeletingRunId(null);
          }
        },
      },
      secondaryAction: {
        label: "Cancel",
        onClick: () => { },
      },
    });
  };

  const runCountLabel = useMemo(() => {
    if (loading) return "";
    return `${runs.length} run${runs.length !== 1 ? "s" : ""}`;
  }, [loading, runs.length]);

  return (
    <div className="flex flex-col w-52 border-r border-ink-200 bg-white h-full">
      {/* Header */}
      <div className="flex-none p-3 border-b border-ink-200">
        <h3 className="text-sm font-semibold text-ink-900 flex items-center gap-2">
          <Clock size={16} className="text-ink-500" />
          History
        </h3>
        {!loading && <p className="text-[11px] text-ink-500 mt-1">{runCountLabel}</p>}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-3 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : runs.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-ink-50 mb-3">
              <Clock size={18} className="text-ink-400" />
            </div>
            <p className="text-xs text-ink-600 font-medium">No runs yet</p>
            <p className="text-[10px] text-ink-400 mt-1">Start a new translation to see it here.</p>
          </div>
        ) : (
          <div>
            {runs.map((run) => (
              <RunItem
                key={run.id}
                run={run}
                isActive={activeRunId === run.id}
                isExpanded={expandedRunIds.has(run.id)}
                onToggle={() => toggleRun(run.id)}
                onSelect={() => handleRunSelect(run)}
                onDelete={handleDeleteRun}
                selectedCheckpointId={selectedCheckpointId}
                onCheckpointSelect={handleCheckpointSelect}
                deletingRunId={deletingRunId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
