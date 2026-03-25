import * as React from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  status?: "online" | "offline" | "busy" | "away";
  rounded?: boolean;
}

const sizeMap = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
  "2xl": "w-32 h-32 text-2xl",
};

const statusColors = {
  online: "bg-[#22c55e]",
  offline: "bg-[#6b7280]",
  busy: "bg-[#ef4444]",
  away: "bg-[#f59e0b]",
};

const statusSizeMap = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
  "2xl": "w-5 h-5",
};

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = "", fallback, size = "md", status, rounded = true, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const initials = fallback ? getInitials(fallback) : "?";

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            "relative inline-flex shrink-0 overflow-hidden",
            rounded ? "rounded-full" : "rounded-lg",
            sizeMap[size],
            className
          )
        )}
        {...props}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="aspect-square object-cover"
            onError={() => setImageError(true)}
            unoptimized={true}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#10b981] text-white font-medium">
            {initials}
          </div>
        )}
        {status && (
          <span
            className={twMerge(
              clsx(
                "absolute bottom-0 right-0 rounded-full border-2 border-[#0a0a0f]",
                statusColors[status],
                statusSizeMap[size]
              )
            )}
            aria-label={status}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
