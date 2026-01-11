import { RunStatus, VALID_TRANSITIONS } from "../types";

export function canTransition(from: RunStatus, to: RunStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export function transitionRunStatus(
  currentStatus: RunStatus,
  targetStatus: RunStatus
): RunStatus {
  if (!canTransition(currentStatus, targetStatus)) {
    throw new Error(
      `Invalid status transition: ${currentStatus} -> ${targetStatus}`
    );
  }
  return targetStatus;
}

export function getNextValidStatuses(currentStatus: RunStatus): RunStatus[] {
  return VALID_TRANSITIONS[currentStatus] ?? [];
}

export function isTerminalStatus(status: RunStatus): boolean {
  return status === "done" || status === "canceled";
}

export function canRetry(status: RunStatus): boolean {
  return status === "failed" || status === "canceled";
}

export function needsUserAction(status: RunStatus): boolean {
  return status === "needs_review";
}

export function getStatusLabel(status: RunStatus): string {
  const labels: Record<RunStatus, string> = {
    draft: "Draft",
    queued: "Queued",
    running: "Processing",
    needs_review: "Needs Review",
    done: "Completed",
    failed: "Failed",
    canceled: "Canceled",
  };
  return labels[status];
}

export function getStatusColor(status: RunStatus): string {
  const colors: Record<RunStatus, string> = {
    draft: "bg-ink-200 text-ink-700",
    queued: "bg-blue-100 text-blue-700",
    running: "bg-amber-100 text-amber-700",
    needs_review: "bg-orange-100 text-orange-700",
    done: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    canceled: "bg-ink-100 text-ink-500",
  };
  return colors[status];
}
