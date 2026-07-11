"use client";

import React from "react";
import { useExperience } from "./experience-provider";
import { motion } from "framer-motion";

/**
 * NoiseTexture
 * A fixed SVG overlay to add cinematic film grain.
 * Respects performance budgets/feature flags.
 */
export function NoiseTexture() {
  const { features } = useExperience();

  if (!features.enableNoise) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.02]"
      style={{ zIndex: "var(--z-noise)" }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

/**
 * AmbientMesh
 * An animated gradient mesh component for hero/auth backgrounds.
 */
export function AmbientMesh() {
  const { features } = useExperience();

  if (!features.enableMesh) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: "var(--z-mesh)" }}
      aria-hidden="true"
    >
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-apyx-purple/10 blur-[120px] animate-pulse" />
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-apyx-blue/10 blur-[120px]" />
      <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-apyx-cyan/10 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
    </div>
  );
}

interface RadialGlowProps {
  color?: "purple" | "blue" | "cyan" | "green";
  position?: "center" | "top" | "bottom" | "left" | "right";
  className?: string;
}

/**
 * RadialGlow
 * Reusable focal lighting for drawing attention to specific components.
 */
export function RadialGlow({ color = "purple", position = "center", className = "" }: RadialGlowProps) {
  const { features } = useExperience();

  if (!features.enableGlows) return null;

  const colorMap = {
    purple: "rgba(176, 38, 255, 0.15)",
    blue: "rgba(47, 123, 255, 0.15)",
    cyan: "rgba(20, 200, 255, 0.15)",
    green: "rgba(34, 197, 94, 0.15)",
  };

  const posMap = {
    center: "50% 50%",
    top: "50% 0%",
    bottom: "50% 100%",
    left: "0% 50%",
    right: "100% 50%",
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        zIndex: "var(--z-lighting)",
        background: `radial-gradient(circle at ${posMap[position]}, ${colorMap[color]} 0%, transparent 60%)`,
      }}
      aria-hidden="true"
    />
  );
}
