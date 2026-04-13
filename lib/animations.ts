import { Variants } from "framer-motion";

// Fade variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.3, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

// Fade up variants (most common)
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: { duration: 0.2 } 
  }
};

// Scale variants
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.3, ease: "easeOut" } 
  },
  hover: { 
    scale: 1.02, 
    transition: { duration: 0.15 } 
  },
  tap: { 
    scale: 0.98, 
    transition: { duration: 0.1 } 
  }
};

// Slide left variants
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Slide right variants
export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Typing animation config
export const typingConfig = {
  speed: 100, // ms per character
  eraseSpeed: 50,
  pauseDuration: 2000,
  cursorColor: "#10b981"
};

// Scroll animation config
export const scrollAnimationConfig = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
  once: true
};

// Animation durations
export const durations = {
  instant: "0ms",
  fastest: "50ms",
  fast: "100ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  slowest: "500ms",
  ambient: "2000ms"
};

// Timing functions
export const timingFunctions = {
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  linear: "linear"
} as const;
