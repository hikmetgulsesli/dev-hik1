"use client";

import * as React from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export interface CursorGlowProps {
  disabled?: boolean;
  color?: string;
  size?: number;
  blendMode?: string;
  lerpFactor?: number;
}

const CursorGlow: React.FC<CursorGlowProps> = ({
  disabled = false,
  color = "#10b981",
  size = 300,
  blendMode = "screen",
  lerpFactor = 0.1,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, { damping: springConfig.damping, stiffness: springConfig.stiffness });
  const y = useSpring(cursorY, { damping: springConfig.damping, stiffness: springConfig.stiffness });

  React.useEffect(() => {
    // Check for mobile/touch device
    const checkMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (disabled || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [disabled, isMobile, cursorX, cursorY]);

  if (disabled || isMobile) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        x,
        y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.15,
        mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        transform: "translate(-50%, -50%)",
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.5,
      }}
    />
  );
};

export { CursorGlow };
