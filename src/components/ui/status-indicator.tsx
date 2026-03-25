"use client";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export interface StatusIndicatorProps {
  status: "online" | "offline" | "busy" | "away";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animate?: boolean;
}

const statusConfig = {
  online: {
    color: "bg-[#22c55e]",
    label: "Çevrimiçi",
    animation: { scale: [1, 2, 2.5], opacity: [1, 0.5, 0] },
  },
  offline: {
    color: "bg-[#6b7280]",
    label: "Çevrimdışı",
    animation: null,
  },
  busy: {
    color: "bg-[#ef4444]",
    label: "Meşgul",
    animation: { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] },
  },
  away: {
    color: "bg-[#f59e0b]",
    label: "Uzak",
    animation: null,
  },
};

const sizeMap = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = "md",
  showLabel = false,
  animate = true,
}) => {
  const config = statusConfig[status];
  const shouldAnimate = animate && config.animation !== null;

  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative">
        <div
          className={twMerge(
            clsx(
              "rounded-full",
              config.color,
              sizeMap[size]
            )
          )}
        />
        {shouldAnimate && config.animation && (
          <motion.div
            className={twMerge(clsx("absolute inset-0 rounded-full", config.color))}
            animate={config.animation}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </div>
      {showLabel && (
        <span className="text-sm text-[#a1a1aa]">{config.label}</span>
      )}
    </div>
  );
};

export { StatusIndicator };
