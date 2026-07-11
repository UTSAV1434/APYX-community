/**
 * APYX Font Configuration
 * Source: .ai/03-design-system.md — Typography System
 *
 * Fonts:
 *  - Outfit     → Headings (font-heading)
 *  - Inter      → Body / UI text (font-sans)
 *  - JetBrains  → Code / monospace (font-mono)
 *
 * Note: Playfair Display removed — it was loaded but unused (saves ~30kB).
 */

import { Inter, Outfit, JetBrains_Mono } from "next/font/google";

/** Inter — body text, UI labels, captions */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Outfit — all headings, display text */
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

/** JetBrains Mono — code blocks, technical labels */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});
