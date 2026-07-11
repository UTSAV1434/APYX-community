/**
 * APYX Motion System — Framer Motion Token Library
 * Source: .ai/09-animation-specifications.md · .ai/05-motion.md
 *
 * Every animation in the project must use these tokens.
 * Never invent custom durations or easing curves.
 *
 * Usage:
 *   import { DURATIONS, EASINGS, variants } from "@/lib/motion";
 *   <motion.div variants={variants.fadeInUp} initial="hidden" animate="visible" />
 */

import type { Variants, Transition } from "framer-motion";

/* ── Duration Tokens ───────────────────────────────────────────────── */
/* Source: .ai/09-animation-specifications.md § 2. Motion Tokens      */

export const DURATIONS = {
  instant:  0.1,   // 100ms — immediate feedback
  fast:     0.15,  // 150ms — micro-interactions
  medium:   0.25,  // 250ms — UI state changes
  standard: 0.35,  // 350ms — standard transitions
  slow:     0.5,   // 500ms — entrance animations
  scene:    0.8,   // 800ms — large scene transitions
  hero:     1.2,   // 1200ms — hero timeline total
} as const;

/* ── Easing Tokens ─────────────────────────────────────────────────── */
/* Source: .ai/09-animation-specifications.md § 2. Motion Tokens      */

export const EASINGS = {
  /** Entrance: fast start, decelerate smoothly */
  entrance: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Exit: fast deceleration, sharp end */
  exit:     [0.7, 0, 0.84, 0] as [number, number, number, number],
  /** Standard: symmetric ease-in-out */
  standard: "easeInOut" as const,
  /** Spring: stiffness 200, damping 25 */
  spring:   { type: "spring", stiffness: 200, damping: 25 } as const,
} as const;

/* ── Shared Transitions ────────────────────────────────────────────── */

/** Standard entrance transition */
export const transitionEntrance: Transition = {
  duration: DURATIONS.standard,
  ease:     EASINGS.entrance,
};

/** Fast UI transition (hover states, focus) */
export const transitionFast: Transition = {
  duration: DURATIONS.fast,
  ease:     EASINGS.standard,
};

/** Slow entrance for hero elements */
export const transitionSlow: Transition = {
  duration: DURATIONS.slow,
  ease:     EASINGS.entrance,
};

/** Spring transition for interactive elements */
export const transitionSpring: Transition = {
  ...EASINGS.spring,
};

/* ── Section Reveal Variants ───────────────────────────────────────── */
/* Source: .ai/09-animation-specifications.md § 7. Section Reveal     */
/* Trigger: 20% visible · translateY 24px→0 · duration 600ms          */

export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASINGS.entrance },
  },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.standard, ease: EASINGS.entrance },
  },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATIONS.standard, ease: EASINGS.entrance },
  },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATIONS.standard, ease: EASINGS.entrance },
  },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATIONS.standard, ease: EASINGS.entrance },
  },
};

/* ── Stagger Container ─────────────────────────────────────────────── */
/* Source: .ai/09-animation-specifications.md § 9. Cards — 80ms stagger */

export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren:  0.08,   // 80ms stagger per spec
      delayChildren:    0,
    },
  },
};

/** Card entrance — used as child of staggerContainer */
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.standard, ease: EASINGS.entrance },
  },
};

/* ── Hero Timeline Variants ────────────────────────────────────────── */
/* Source: .ai/09-animation-specifications.md § 6. Hero Timeline       */
/* 0ms bg → 150ms badge → 300ms heading → 500ms desc →                 */
/* 700ms primaryCTA → 850ms secondaryCTA → 1000ms visual               */

/** Create a hero element variant with the correct spec delay */
export function heroDelay(delayMs: number): Variants {
  return {
    hidden:  { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay:    delayMs / 1000,
        duration: DURATIONS.slow,
        ease:     EASINGS.entrance,
      },
    },
  };
}

export const heroBadge    = heroDelay(150);
export const heroHeading  = heroDelay(300);
export const heroDesc     = heroDelay(500);
export const heroCTA1     = heroDelay(700);
export const heroCTA2     = heroDelay(850);
export const heroVisual   = heroDelay(1000);

/* ── Dialog / Modal Variants ───────────────────────────────────────── */
/* Source: .ai/09-animation-specifications.md § 15. Dialogs           */

export const dialogOverlay: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATIONS.fast } },
  exit:    { opacity: 0, transition: { duration: DURATIONS.fast } },
};

export const dialogContent: Variants = {
  hidden:  { opacity: 0, scale: 0.95, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATIONS.standard, ease: EASINGS.entrance },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 4,
    transition: { duration: DURATIONS.fast, ease: EASINGS.exit },
  },
};

/* ── Page Transition Variants ──────────────────────────────────────── */
/* Source: .ai/09-animation-specifications.md § 16. Page Transitions  */

export const pageTransition: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.standard, ease: EASINGS.entrance },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: DURATIONS.fast, ease: EASINGS.exit },
  },
};

/* ── Interactive Element Hover ─────────────────────────────────────── */
/* Source: .ai/09-animation-specifications.md § 8. Buttons, § 9. Cards */

/** Button hover/press motion props */
export const buttonMotion = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap:   { scale: 0.98, y: 0 },
  transition: transitionFast,
} as const;

/** Card hover motion props */
export const cardMotion = {
  whileHover: { y: -2, transition: transitionFast },
} as const;

/* ── Utility: Viewport settings ────────────────────────────────────── */
/* Source: .ai/09-animation-specifications.md § 7. Trigger: 20% visible */

export const VIEWPORT_ONCE = {
  once:   true,
  amount: 0.2,   // 20% visible trigger per spec
} as const;
