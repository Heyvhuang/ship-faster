"use client";

import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Loader2,
  X,
} from "lucide-react";

export type ToastVariant = "success" | "error" | "warning" | "info" | "loading";

type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastCardProps = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  action?: ToastAction;
  secondaryAction?: ToastAction;
  onClose?: () => void;
  progress?: number;
};

const variantStyles: Record<
  ToastVariant,
  { icon: React.ElementType; accent: string; ring: string; bar: string; glow: string }
> = {
  success: {
    icon: CheckCircle2,
    accent: "text-safe",
    ring: "ring-safe/15",
    bar: "bg-safe",
    glow: "shadow-safe/10",
  },
  error: {
    icon: XCircle,
    accent: "text-alert",
    ring: "ring-alert/15",
    bar: "bg-alert",
    glow: "shadow-alert/10",
  },
  warning: {
    icon: AlertTriangle,
    accent: "text-amber-600",
    ring: "ring-amber-200",
    bar: "bg-amber-500",
    glow: "shadow-amber-200/30",
  },
  info: {
    icon: Info,
    accent: "text-accent",
    ring: "ring-accent/15",
    bar: "bg-accent",
    glow: "shadow-accent/10",
  },
  loading: {
    icon: Loader2,
    accent: "text-accent",
    ring: "ring-accent/15",
    bar: "bg-accent",
    glow: "shadow-accent/10",
  },
};

export function ToastCard({
  title,
  description,
  variant = "info",
  action,
  secondaryAction,
  onClose,
  progress,
}: ToastCardProps) {
  const styles = variantStyles[variant];
  const Icon = styles.icon;
  const showProgress = typeof progress === "number";

  return (
    <div className="group pointer-events-auto w-[360px] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.24),0_12px_64px_-8px_rgba(0,0,0,0.16)] animate-enter-spring transition-all duration-300 hover:shadow-[0_12px_48px_-4px_rgba(0,0,0,0.32),0_16px_80px_-8px_rgba(0,0,0,0.24)]">
      <div className="flex items-start gap-4 px-5 pt-5 pb-4">
        <div
          className={`flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center ring-1 ${styles.ring} shadow-sm ${styles.glow} transition-transform duration-500 hover:scale-105`}
        >
          <Icon className={`w-5 h-5 ${styles.accent} ${variant === "loading" ? "animate-spin" : ""}`} />
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm font-bold text-white tracking-tight">{title}</p>
          {description && <p className="text-[13px] text-ink-400 mt-1.5 leading-relaxed font-medium">{description}</p>}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 -mr-2 -mt-2 p-2 text-ink-500 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className="flex items-center gap-2 px-5 pb-5">
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[12px] font-semibold text-ink-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-sm"
            >
              {secondaryAction.label}
            </button>
          )}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={`flex-1 rounded-full px-3 py-2 text-[12px] font-semibold text-white ${styles.bar} shadow-md shadow-current/20 hover:opacity-95 hover:shadow-lg hover:shadow-current/30 hover:-translate-y-0.5 transition-all duration-200`}
            >
              {action.label}
            </button>
          )}
        </div>
      )}

      {showProgress && (
        <div className="relative h-1.5 w-full bg-white/10">
          <div
            className={`absolute inset-y-0 left-0 ${styles.bar} transition-all duration-300 ease-out`}
            style={{
              width: `${Math.min(Math.max(progress, 0), 100)}%`,
              backgroundImage: "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
              backgroundSize: "1rem 1rem"
            }}
          >
            <div className={`absolute right-0 top-0 bottom-0 w-2 bg-white/30 shadow-[0_0_8px_rgba(255,255,255,0.8)]`} />
          </div>
        </div>
      )}

      {!showProgress && !(action || secondaryAction) && <div className="h-1.5" />}
    </div>
  );
}
