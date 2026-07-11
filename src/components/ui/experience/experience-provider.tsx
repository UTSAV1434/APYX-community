"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { EXPERIENCE_CONFIG, ExperienceConfig } from "@/lib/experience-config";

interface ExperienceContextType extends ExperienceConfig {
  reducedMotion: boolean;
  reducedTransparency: boolean;
}

const ExperienceContext = createContext<ExperienceContextType | null>(null);

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return context;
}

interface ExperienceProviderProps {
  children: React.ReactNode;
  /** Optional overrides for the default config */
  configOverrides?: Partial<ExperienceConfig["features"]>;
}

export function ExperienceProvider({
  children,
  configOverrides,
}: ExperienceProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [reducedTransparency, setReducedTransparency] = useState(false);

  useEffect(() => {
    // Check OS-level preferences
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const transparencyQuery = window.matchMedia(
      "(prefers-reduced-transparency: reduce)"
    );

    setReducedMotion(motionQuery.matches);
    setReducedTransparency(transparencyQuery.matches);

    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const handleTransparency = (e: MediaQueryListEvent) =>
      setReducedTransparency(e.matches);

    motionQuery.addEventListener("change", handleMotion);
    transparencyQuery.addEventListener("change", handleTransparency);

    return () => {
      motionQuery.removeEventListener("change", handleMotion);
      transparencyQuery.removeEventListener("change", handleTransparency);
    };
  }, []);

  // Compute final config
  const config: ExperienceContextType = {
    ...EXPERIENCE_CONFIG,
    features: {
      ...EXPERIENCE_CONFIG.features,
      ...configOverrides,
      // Automatically disable heavy effects if OS preferences are set
      enableMesh: reducedTransparency ? false : (configOverrides?.enableMesh ?? EXPERIENCE_CONFIG.features.enableMesh),
      enableNoise: reducedTransparency ? false : (configOverrides?.enableNoise ?? EXPERIENCE_CONFIG.features.enableNoise),
      enableGlass: reducedTransparency ? false : (configOverrides?.enableGlass ?? EXPERIENCE_CONFIG.features.enableGlass),
      enablePageTransitions: reducedMotion ? false : (configOverrides?.enablePageTransitions ?? EXPERIENCE_CONFIG.features.enablePageTransitions),
      enableScrollReveal: reducedMotion ? false : (configOverrides?.enableScrollReveal ?? EXPERIENCE_CONFIG.features.enableScrollReveal),
    },
    reducedMotion,
    reducedTransparency,
  };

  return (
    <ExperienceContext.Provider value={config}>
      {children}
    </ExperienceContext.Provider>
  );
}
