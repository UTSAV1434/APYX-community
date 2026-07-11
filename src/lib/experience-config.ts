/**
 * APYX Experience Configuration
 * Centralizes feature flags and performance budgets for the Global Experience Layer.
 */

export interface ExperienceConfigType {
  features: {
    enableNoise: boolean;
    enableMesh: boolean;
    enableGlows: boolean;
    enableGlass: boolean;
    enablePageTransitions: boolean;
    enableScrollReveal: boolean;
  };
  budgets: {
    maxActiveBlurs: number;
    maxShadowComplexity: number;
    maxGradientLayers: number;
    maxSimultaneousMotion: number;
  };
}

export const EXPERIENCE_CONFIG: ExperienceConfigType = {
  // ── Feature Flags ────────────────────────────────────────────────────────
  features: {
    enableNoise: true,
    enableMesh: true,
    enableGlows: true,
    enableGlass: true,
    enablePageTransitions: true,
    enableScrollReveal: true,
  },

  // ── Performance Budgets ──────────────────────────────────────────────────
  budgets: {
    maxActiveBlurs: 3,         // Maximum simultaneous backdrop-blurs
    maxShadowComplexity: 2,    // Maximum nested structural shadows
    maxGradientLayers: 2,      // Maximum overlapping mesh layers
    maxSimultaneousMotion: 10, // Maximum elements animating concurrently
  },
};

export type ExperienceFeatures = keyof typeof EXPERIENCE_CONFIG.features;
export type ExperienceConfig = ExperienceConfigType;
