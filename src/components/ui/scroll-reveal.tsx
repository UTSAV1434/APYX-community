"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1], // ease-spring
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

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
