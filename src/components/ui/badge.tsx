import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  size?: "sm" | "md";
  removable?: boolean;
  onRemove?: () => void;
}

const variantStyles = {
  default: "bg-[#1a1a1f] text-[#a1a1aa]",
  primary: "bg-[#10b981]/20 text-[#10b981]",
  secondary: "bg-[#6366f1]/20 text-[#6366f1]",
  accent: "bg-[#8b5cf6]/20 text-[#8b5cf6]",
  success: "bg-[#22c55e]/20 text-[#22c55e]",
  warning: "bg-[#f59e0b]/20 text-[#f59e0b]",
  error: "bg-[#ef4444]/20 text-[#ef4444]",
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", removable = false, onRemove, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={twMerge(
          clsx(
            "inline-flex items-center gap-1 rounded-full font-medium transition-colors cursor-default",
            variantStyles[variant],
            size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
            className
          )
        )}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="ml-1 hover:opacity-70 cursor-pointer"
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
