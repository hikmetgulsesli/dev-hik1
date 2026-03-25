"use client";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: "default" | "destructive" | "success";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showClose?: boolean;
  children: React.ReactNode;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full inset-4",
};

const variantBorderMap = {
  default: "border-[#27272a]",
  destructive: "border-[#ef4444]",
  success: "border-[#22c55e]",
};

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  variant = "default",
  size = "md",
  showClose = true,
  children,
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={twMerge(
                clsx(
                  "relative w-full bg-[#111113] border rounded-2xl shadow-2xl",
                  variantBorderMap[variant],
                  size !== "full" && sizeMap[size],
                  size === "full" && "rounded-none"
                )
              )}
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              {showClose && (
                <button
                  onClick={() => onOpenChange(false)}
                  className="absolute top-4 right-4 rounded-md p-1 hover:bg-white/10 cursor-pointer transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-[#a1a1aa]" />
                </button>
              )}
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Modal };
