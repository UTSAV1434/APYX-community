/**
 * APYX Design Token Constants — TypeScript
 * Source: .ai/12-design-tokens.md · .ai/02-brand.md · .ai/03-design-system.md
 *
 * These constants mirror every CSS token for use in:
 *  - Framer Motion inline styles
 *  - Dynamic JS calculations
 *  - Server-side rendering logic
 *
 * NOTE: These are compile-time constants — fully tree-shaken if unused.
 */

/* ── Color Tokens ──────────────────────────────────────────────────── */

export const COLORS = {
  /* Backgrounds */
  bg:         "#050816",
  bgAlt:      "#0B1023",
  surface:    "#141B34",

  /* Borders */
  border:     "#1F2947",
  borderAlt:  "#2A3559",

  /* Brand gradient stops — Purple → Indigo → Blue → Cyan */
  purple:     "#B026FF",   // Brand Primary
  indigo:     "#6D4AFF",   // Brand Secondary
  blue:       "#2F7BFF",   // Brand Accent
  cyan:       "#14C8FF",   // Brand Highlight

  /* Status */
  success:    "#22C55E",
  warning:    "#FACC15",
  danger:     "#EF4444",
  info:       "#3B82F6",

  /* Text hierarchy */
  text:           "#FFFFFF",
  textSecondary:  "#B5BED3",
  textMuted:      "#7A859E",
  textDisabled:   "#5C6478",
} as const;

/* ── Typography Scale ──────────────────────────────────────────────── */
/* Source: .ai/03-design-system.md — Type Scale                       */

export const TYPE_SCALE = {
  display: "4rem",    // 64px — hero display
  h1:      "3rem",    // 48px — page H1
  h2:      "2.5rem",  // 40px — section H2
  h3:      "2rem",    // 32px — sub-section H3
  h4:      "1.5rem",  // 24px — card H4
  bodyLg:  "1.25rem", // 20px — lead paragraph
  body:    "1rem",    // 16px — body text
  sm:      "0.875rem",// 14px — captions, labels
  xs:      "0.75rem", // 12px — badges, tags
} as const;

/* ── Spacing Scale ─────────────────────────────────────────────────── */
/* Source: .ai/12-design-tokens.md — 4px base unit                   */

export const SPACING = {
  px:   "1px",
  0.5:  "2px",
  1:    "4px",
  2:    "8px",
  3:    "12px",
  4:    "16px",
  5:    "20px",
  6:    "24px",
  8:    "32px",
  10:   "40px",
  12:   "48px",
  16:   "64px",
  20:   "80px",
  24:   "96px",
  32:   "128px",
} as const;

/* ── Border Radius Scale ───────────────────────────────────────────── */
/* Source: .ai/12-design-tokens.md                                    */

export const RADIUS = {
  sm:   "8px",   // Small — badges, chips
  md:   "12px",  // Medium — dropdowns, inputs
  lg:   "16px",  // Large — buttons, cards
  xl:   "20px",  // XL — Card radius
  "2xl": "28px", // 2XL — max card radius
  pill: "999px", // Pill — badges, tags
} as const;

/* ── Shadow Scale ──────────────────────────────────────────────────── */
/* Source: .ai/12-design-tokens.md                                    */

export const SHADOWS = {
  sm:    "0 1px 3px rgba(0, 0, 0, 0.4)",
  md:    "0 4px 12px rgba(0, 0, 0, 0.4)",
  lg:    "0 8px 24px rgba(0, 0, 0, 0.5)",
  xl:    "0 16px 48px rgba(0, 0, 0, 0.6)",
  brand: "0 8px 32px rgba(176, 38, 255, 0.25)",
  glow:  "0 0 40px rgba(176, 38, 255, 0.2), 0 0 80px rgba(47, 123, 255, 0.1)",
} as const;

/* ── Component Sizes ───────────────────────────────────────────────── */
/* Source: .ai/12-design-tokens.md                                    */

export const BUTTON_HEIGHTS = {
  xs:  "32px",
  sm:  "40px",
  md:  "48px",  // default
  lg:  "52px",
  xl:  "56px",
} as const;

export const INPUT_HEIGHT    = "52px";
export const TEXTAREA_HEIGHT = "160px";
export const NAVBAR_HEIGHT   = "72px";

/* ── Layout ────────────────────────────────────────────────────────── */
/* Source: .ai/03-design-system.md                                    */

export const LAYOUT = {
  contentMaxWidth:  "1280px",  // max-w-7xl
  fullMaxWidth:     "1440px",
  readingMaxWidth:  "720px",   // max-w-2xl
  navbarHeight:     "72px",
  sectionPaddingMobile:  "32px",
  sectionPaddingTablet:  "64px",
  sectionPaddingDesktop: "96px",
} as const;

/* ── Breakpoints ───────────────────────────────────────────────────── */
/* Source: .ai/03-design-system.md — matches Tailwind defaults        */

export const BREAKPOINTS = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  "2xl": "1536px",
} as const;
