"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useExperience } from "./experience/experience-provider";
import { transitionEntrance, transitionSlow } from "@/lib/motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

const directionMap = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  distance = 30,
  once = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const { features } = useExperience();

  if (!features.enableScrollReveal) {
    return <div className={className}>{children}</div>;
  }

  const initial = {
    opacity: 0,
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{
        ...transitionSlow,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered reveal for grids/lists
interface StaggeredRevealProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export function StaggeredReveal({
  children,
  staggerDelay = 0.1,
  className,
}: StaggeredRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { features } = useExperience();

  if (!features.enableScrollReveal) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            ...transitionEntrance,
            delay: i * staggerDelay,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
