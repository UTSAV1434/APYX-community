"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useExperience } from "./experience-provider";
import { pageTransition } from "@/lib/motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition
 * Wraps page content to provide smooth entrance and exit animations on route changes.
 * Respects performance budgets and reduced motion preferences.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { features } = useExperience();

  if (!features.enablePageTransitions) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
