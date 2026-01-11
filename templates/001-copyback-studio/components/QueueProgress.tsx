"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";

type ProgressStatus = "pending" | "processing" | "completed" | "error";

interface QueueItem {
  id: string;
  label: string;
  status: ProgressStatus;
  progress: number;
}

interface QueueProgressProps {
  runId: string;
  items: QueueItem[];
  onComplete?: () => void;
}

export const QueueProgress: React.FC<QueueProgressProps> = ({
  runId,
  items,
  onComplete,
}) => {
  const { supabase } = useAuth();
  const [localItems, setLocalItems] = useState<QueueItem[]>(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  useEffect(() => {
    const allCompleted = localItems.every(
      (item) => item.status === "completed" || item.status === "error"
    );
    if (allCompleted && localItems.length > 0 && onComplete) {
      onComplete();
    }
  }, [localItems, onComplete]);

  useEffect(() => {
    const channel = supabase
      .channel(`run-${runId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "runs",
          filter: `id=eq.${runId}`,
        },
        (payload) => {
          const progress = payload.new.progress as Record<string, any>;
          if (progress) {
            setLocalItems((prev) =>
              prev.map((item) => {
                const itemProgress = progress[item.id];
                if (itemProgress) {
                  return {
                    ...item,
                    status: itemProgress.status || item.status,
                    progress: itemProgress.progress || item.progress,
                  };
                }
                return item;
              })
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, runId]);

  const getStatusIcon = (status: ProgressStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-ink-300" />;
      case "processing":
        return <Loader2 className="w-5 h-5 text-accent animate-spin" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-safe" />;
      case "error":
        return <XCircle className="w-5 h-5 text-alert" />;
    }
  };

  const overallProgress =
    localItems.length > 0
      ? Math.round(
          localItems.reduce((acc, item) => {
            if (item.status === "completed") return acc + 100;
            if (item.status === "error") return acc + 100;
            return acc + item.progress;
          }, 0) / localItems.length
        )
      : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-ink-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-ink-700">Overall Progress</span>
          <span className="text-sm font-bold text-ink-900">{overallProgress}%</span>
        </div>
        <div className="w-full h-3 bg-ink-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 rounded-full"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="bg-white border border-ink-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-ink-100 bg-paper">
          <h2 className="font-bold text-sm uppercase tracking-wide text-ink-500">
            Processing Queue
          </h2>
        </div>
        <div className="divide-y divide-ink-100">
          {localItems.map((item) => (
            <div key={item.id} className="px-6 py-4 flex items-center gap-4">
              {getStatusIcon(item.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-ink-900">{item.label}</span>
                  {item.status === "processing" && (
                    <span className="text-xs text-ink-400">{item.progress}%</span>
                  )}
                </div>
                {item.status === "processing" && (
                  <div className="w-full h-1.5 bg-ink-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
