"use client";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: number | string;
  height?: number | string;
  animation?: "pulse" | "wave" | "none";
}

const variantStyles = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded-lg",
  card: "rounded-xl",
};

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "text",
  width,
  height,
  animation = "wave",
  ...props
}) => {
  const style: React.CSSProperties = {
    width: width ?? (variant === "circular" ? height ?? 40 : "100%"),
    height: height ?? (variant === "text" ? 16 : 40),
  };

  return (
    <div
      className={twMerge(
        clsx(
          "bg-[#1a1a1f]",
          variantStyles[variant],
          animation === "pulse" && "animate-pulse",
          animation === "wave" && "relative overflow-hidden",
          className
        )
      )}
      style={style}
      {...props}
    >
      {animation === "wave" && (
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
          }}
        />
      )}
    </div>
  );
};

export { Skeleton };
