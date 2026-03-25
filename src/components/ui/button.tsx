import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#10b981] text-white hover:bg-[#059669] hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0",
        secondary:
          "border border-[#27272a] text-[#10b981] hover:border-[#10b981] hover:bg-[#10b981]/10 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] active:scale-[0.98]",
        ghost:
          "text-[#a1a1aa] hover:text-[#10b981] hover:bg-[#1a1a1f] active:scale-[0.98]",
        destructive:
          "bg-[#ef4444] text-white hover:bg-[#ef4444]/90 active:scale-[0.98]",
        link: "text-[#10b981] underline hover:text-[#059669]",
      },
      size: {
        sm: "h-8 px-3 py-1.5",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={twMerge(clsx(buttonVariants({ variant, size, className })))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          leftIcon
        ) : null}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
