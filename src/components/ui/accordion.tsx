"use client";

import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface AccordionItem {
  value: string;
  trigger: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
  items: AccordionItem[];
}

const AccordionItem: React.FC<{
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
}> = ({ item, isOpen, onToggle, disabled }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border border-[#27272a] rounded-md overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={twMerge(
          clsx(
            "flex w-full items-center justify-between px-4 py-3 text-left transition-colors",
            "hover:bg-[#1a1a1f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50",
            isOpen ? "text-[#10b981]" : "text-[#fafafa]",
            disabled && "opacity-50 cursor-not-allowed"
          )
        )}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.value}`}
      >
        <span className="font-medium">{item.trigger}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              ref={contentRef}
              id={`accordion-content-${item.value}`}
              className="px-4 pb-3 text-[#a1a1aa]"
            >
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({
  type = "single",
  defaultValue,
  collapsible = true,
  items,
}) => {
  const [openValues, setOpenValues] = React.useState<string | string[]>(() => {
    if (defaultValue) {
      return type === "single" ? defaultValue : Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return type === "single" ? "" : [];
  });

  const isOpen = (value: string): boolean => {
    if (type === "single") {
      return openValues === value;
    }
    return (openValues as string[]).includes(value);
  };

  const handleToggle = (value: string) => {
    if (type === "single") {
      if (collapsible && openValues === value) {
        setOpenValues("");
      } else {
        setOpenValues(value);
      }
    } else {
      const current = openValues as string[];
      if (current.includes(value)) {
        setOpenValues(current.filter((v) => v !== value));
      } else {
        setOpenValues([...current, value]);
      }
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          item={item}
          isOpen={isOpen(item.value)}
          onToggle={() => handleToggle(item.value)}
          disabled={type === "single" && !collapsible && openValues === item.value}
        />
      ))}
    </div>
  );
};

export { Accordion };
