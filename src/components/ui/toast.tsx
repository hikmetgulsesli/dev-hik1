"use client";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ToastProps {
  id: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
  dismissible?: boolean;
  onDismiss: (id: string) => void;
}

const variantConfig = {
  default: {
    icon: Info,
    borderColor: "border-[#27272a]",
    bgColor: "bg-[#111113]",
  },
  success: {
    icon: CheckCircle,
    borderColor: "border-[#22c55e]",
    bgColor: "bg-[#22c55e]/10",
  },
  error: {
    icon: XCircle,
    borderColor: "border-[#ef4444]",
    bgColor: "bg-[#ef4444]/10",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-[#f59e0b]",
    bgColor: "bg-[#f59e0b]/10",
  },
  info: {
    icon: Info,
    borderColor: "border-[#3b82f6]",
    bgColor: "bg-[#3b82f6]/10",
  },
};

const Toast: React.FC<ToastProps> = ({
  id,
  variant = "default",
  title,
  description,
  duration = 5000,
  dismissible = true,
  onDismiss,
}) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={twMerge(
        clsx(
          "relative flex items-start gap-3 rounded-lg border p-4 shadow-lg",
          config.borderColor,
          config.bgColor
        )
      )}
      role="alert"
    >
      <Icon className={twMerge(clsx("h-5 w-5 shrink-0 mt-0.5", {
        "text-[#22c55e]": variant === "success",
        "text-[#ef4444]": variant === "error",
        "text-[#f59e0b]": variant === "warning",
        "text-[#3b82f6]": variant === "info",
        "text-[#a1a1aa]": variant === "default",
      }))} />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-[#fafafa]">{title}</p>
        {description && (
          <p className="text-sm text-[#a1a1aa]">{description}</p>
        )}
      </div>
      {dismissible && (
        <button
          onClick={() => onDismiss(id)}
          className="shrink-0 rounded-md p-1 hover:bg-white/10 cursor-pointer transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4 text-[#a1a1aa]" />
        </button>
      )}
    </motion.div>
  );
};

// Toast context and provider
interface ToastContextValue {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id" | "onDismiss">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastProps, "id" | "onDismiss">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => {
      const newToasts = [...prev, { ...toast, id, onDismiss: removeToast }];
      // Max 3 visible
      return newToasts.slice(-3);
    });
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onDismiss={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export { Toast };
