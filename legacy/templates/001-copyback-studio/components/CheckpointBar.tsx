"use client";

import React from "react";
import { Clock, Image as ImageIcon } from "lucide-react";

export interface Checkpoint {
  id: string;
  language_code: string;
  variant_index: number;
  created_at: string;
  output_asset_id: string | null;
  metadata?: Record<string, unknown>;
}

export interface CheckpointBarProps {
  checkpoints: Checkpoint[];
  selectedCheckpoint: Checkpoint | null;
  onSelectCheckpoint: (checkpoint: Checkpoint) => void;
  getPreviewUrl?: (checkpoint: Checkpoint) => string | null;
}

export function CheckpointBar({
  checkpoints,
  selectedCheckpoint,
  onSelectCheckpoint,
  getPreviewUrl,
}: CheckpointBarProps) {
  if (checkpoints.length === 0) {
    return null;
  }

  return (
    <div className="w-52 border-r border-ink-200 bg-white overflow-y-auto">
      <div className="p-3 border-b border-ink-200">
        <h3 className="text-sm font-semibold text-ink-900 flex items-center gap-2">
          <Clock size={16} className="text-ink-500" />
          History
        </h3>
        <p className="text-xs text-ink-500 mt-1">
          {checkpoints.length} checkpoint{checkpoints.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="divide-y divide-ink-100">
        {checkpoints.map((checkpoint) => {
          const isSelected = selectedCheckpoint?.id === checkpoint.id;
          const previewUrl = getPreviewUrl?.(checkpoint) ?? null;

          return (
            <button
              key={checkpoint.id}
              onClick={() => onSelectCheckpoint(checkpoint)}
              className={`w-full px-3 py-2 text-left transition-colors hover:bg-ink-50 ${
                isSelected ? "bg-accent/10 border-l-2 border-accent" : ""
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover border border-ink-200 bg-ink-50"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full border border-ink-200 bg-ink-50 flex items-center justify-center text-ink-400">
                    <ImageIcon size={14} />
                  </div>
                )}
                <div className="min-w-0">
                  <span className={`text-sm font-medium truncate ${
                    isSelected ? "text-accent" : "text-ink-900"
                  }`}>
                    {checkpoint.language_code}
                  </span>
                  {checkpoint.variant_index > 0 && (
                    <span className="ml-1 text-xs text-ink-400">
                      v{checkpoint.variant_index + 1}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
