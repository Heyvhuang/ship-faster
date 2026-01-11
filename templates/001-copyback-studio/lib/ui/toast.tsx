"use client";

import { toast } from "sonner";
import { ToastCard, ToastVariant } from "../../components/ToastCard";

type ToastAction = {
  label: string;
  onClick: () => void;
};

type ToastOptions = {
  title: string;
  description?: string;
  duration?: number;
  action?: ToastAction;
  secondaryAction?: ToastAction;
  progress?: number;
};

const showToast = (variant: ToastVariant, options: ToastOptions) => {
  const duration = options.duration ?? (variant === "loading" ? Infinity : 5000);
  return toast.custom(
    (t) => (
      <ToastCard
        title={options.title}
        description={options.description}
        variant={variant}
        action={
          options.action
            ? {
                label: options.action.label,
                onClick: () => {
                  options.action?.onClick();
                  toast.dismiss(t);
                },
              }
            : undefined
        }
        secondaryAction={
          options.secondaryAction
            ? {
                label: options.secondaryAction.label,
                onClick: () => {
                  options.secondaryAction?.onClick();
                  toast.dismiss(t);
                },
              }
            : undefined
        }
        progress={options.progress}
        onClose={() => toast.dismiss(t)}
      />
    ),
    { duration }
  );
};

export const notify = {
  success: (title: string, description?: string, options?: Partial<ToastOptions>) =>
    showToast("success", { title, description, ...options }),
  error: (title: string, description?: string, options?: Partial<ToastOptions>) =>
    showToast("error", { title, description, ...options }),
  warning: (title: string, description?: string, options?: Partial<ToastOptions>) =>
    showToast("warning", { title, description, ...options }),
  info: (title: string, description?: string, options?: Partial<ToastOptions>) =>
    showToast("info", { title, description, ...options }),
  loading: (title: string, description?: string, options?: Partial<ToastOptions>) =>
    showToast("loading", { title, description, ...options }),
  confirm: (options: ToastOptions) =>
    showToast("warning", { ...options, duration: options.duration ?? 8000 }),
};

export const createProgressToast = (options: Omit<ToastOptions, "progress"> & { progress?: number }) => {
  const id = toast.custom(
    () => (
      <ToastCard
        title={options.title}
        description={options.description}
        variant="loading"
        progress={options.progress ?? 0}
      />
    ),
    { duration: Infinity }
  );

  const update = (progress: number, description?: string) =>
    toast.custom(
      (t) => (
        <ToastCard
          title={options.title}
          description={description ?? options.description}
          variant="loading"
          progress={progress}
          onClose={() => toast.dismiss(t)}
        />
      ),
      { id, duration: Infinity }
    );

  const success = (title: string, description?: string) =>
    toast.custom(
      (t) => (
        <ToastCard
          title={title}
          description={description}
          variant="success"
          onClose={() => toast.dismiss(t)}
        />
      ),
      { id, duration: 4000 }
    );

  const error = (title: string, description?: string) =>
    toast.custom(
      (t) => (
        <ToastCard
          title={title}
          description={description}
          variant="error"
          onClose={() => toast.dismiss(t)}
        />
      ),
      { id, duration: 6000 }
    );

  return { id, update, success, error };
};
