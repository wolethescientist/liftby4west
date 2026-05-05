"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { clsx } from "clsx";

type ToastVariant = "default" | "success" | "error";

type LegacyToastInput = {
  title: string;
  message?: string;
  tone?: "info" | "success" | "destructive";
};

type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  show: (message: string, variant?: ToastVariant) => void;
  showToast: (toast: LegacyToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const icons = {
  default: Info,
  success: CheckCircle2,
  error: XCircle,
};

const variants = {
  default: "border-border",
  success: "border-success/30",
  error: "border-destructive/30",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (message: string, variant: ToastVariant = "default") => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message, variant }].slice(-3));
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );

  const showToast = useCallback(
    ({ title, message, tone = "info" }: LegacyToastInput) => {
      const variant = tone === "destructive" ? "error" : tone === "success" ? "success" : "default";
      show(message ? `${title}: ${message}` : title, variant);
    },
    [show],
  );

  const value = useMemo(() => ({ show, showToast }), [show, showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => {
          const Icon = icons[toast.variant];

          return (
            <div
              key={toast.id}
              className={clsx(
                "flex items-start gap-3 rounded-lg border bg-white p-4 shadow-sm",
                variants[toast.variant],
              )}
            >
              <Icon
                className={clsx(
                  "mt-0.5 h-5 w-5 shrink-0",
                  toast.variant === "success" && "text-success",
                  toast.variant === "error" && "text-destructive",
                  toast.variant === "default" && "text-navy",
                )}
              />
              <p className="min-w-0 flex-1 text-sm font-semibold leading-5 text-text">
                {toast.message}
              </p>
              <button
                type="button"
                aria-label="Dismiss toast"
                onClick={() => dismiss(toast.id)}
                className="rounded-md p-1 text-neutral-500 hover:bg-subtle hover:text-text"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
