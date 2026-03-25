import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error = false, errorMessage, leftIcon, rightIcon, inputSize = "md", ...props }, ref) => {
    const sizeClass = sizeClasses[inputSize];
    
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={twMerge(
            clsx(
              "flex w-full bg-[#111113] border rounded-md text-[#fafafa] placeholder:text-[#6b7280] transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] focus:ring-offset-2 focus:ring-offset-[#0a0a0f]",
              error && "border-[#ef4444] focus:ring-[#ef4444]/20 focus:border-[#ef4444]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              sizeClass,
              className
            )
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
            {rightIcon}
          </div>
        )}
        {error && errorMessage && (
          <p className="mt-1 text-sm text-[#ef4444]">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, maxLength, showCount = false, ...props }, ref) => {
    const [value, setValue] = React.useState("");
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
      props.onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <textarea
          className={twMerge(
            clsx(
              "flex min-h-[80px] w-full bg-[#111113] border border-[#27272a] rounded-md px-4 py-3 text-base text-[#fafafa] placeholder:text-[#6b7280] transition-colors resize-y",
              "focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] focus:ring-offset-2 focus:ring-offset-[#0a0a0f]",
              className
            )
          )}
          ref={textareaRef}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {showCount && maxLength && (
          <p className="mt-1 text-xs text-[#6b7280] text-right">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
