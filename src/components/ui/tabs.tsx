"use client";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  items: TabItem[];
}

const Tabs: React.FC<TabsProps> = ({
  value,
  defaultValue,
  onValueChange,
  items,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || items[0]?.value || "");
  
  const selectedValue = value ?? internalValue;

  const handleSelect = (val: string) => {
    if (value === undefined) {
      setInternalValue(val);
    }
    onValueChange?.(val);
  };

  const selectedItem = items.find((item) => item.value === selectedValue);

  return (
    <div className="w-full">
      {/* Tab List */}
      <div role="tablist" className="flex border-b border-[#27272a]">
        {items.map((item) => {
          const isSelected = item.value === selectedValue;
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelect(item.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  const currentIndex = items.findIndex((i) => i.value === selectedValue);
                  const nextIndex = (currentIndex + 1) % items.length;
                  handleSelect(items[nextIndex].value);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  const currentIndex = items.findIndex((i) => i.value === selectedValue);
                  const prevIndex = (currentIndex - 1 + items.length) % items.length;
                  handleSelect(items[prevIndex].value);
                } else if (e.key === "Home") {
                  e.preventDefault();
                  handleSelect(items[0].value);
                } else if (e.key === "End") {
                  e.preventDefault();
                  handleSelect(items[items.length - 1].value);
                }
              }}
              className={twMerge(
                clsx(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                  "border-b-2 -mb-px",
                  isSelected
                    ? "border-[#10b981] text-[#10b981]"
                    : "border-transparent text-[#a1a1aa] hover:text-[#10b981]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
                )
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </button>
          );
        })}
      </div>
      
      {/* Tab Content */}
      <div role="tabpanel" className="pt-4">
        {selectedItem?.content}
      </div>
    </div>
  );
};

export { Tabs };
