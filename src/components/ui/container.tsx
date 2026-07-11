/**
 * APYX Layout Primitives
 * Source: .ai/03-design-system.md · .ai/12-design-tokens.md
 *
 * Provides three composable layout wrappers:
 *  - Container  — 1280px max-width, responsive horizontal padding
 *  - Section    — Spec-correct vertical section padding (32/64/96px)
 *  - PageWrapper — Full-page flex-column wrapper
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import { AmbientMesh } from "./experience/backgrounds";

/* ── Container ──────────────────────────────────────────────────────── */
/**
 * Centers content at 1280px max-width with responsive horizontal padding.
 * Source: .ai/03-design-system.md — "Content max-width: 1280px"
 */
interface ContainerProps extends React.ComponentProps<"div"> {
  /** "wide" = 1280px (default), "reading" = 720px (articles, hero text) */
  size?: "wide" | "reading" | "full";
}

function Container({
  className,
  size = "wide",
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "wide"    && "max-w-7xl",     // 1280px
        size === "reading" && "max-w-2xl",     //  672px ≈ 720px
        size === "full"    && "max-w-none",    // full width
        className
      )}
      {...props}
    />
  );
}

/* ── Section ────────────────────────────────────────────────────────── */
/**
 * Applies spec-correct vertical section padding.
 * Extended with Declarative Experience Props.
 */
interface SectionProps extends React.ComponentProps<"section"> {
  padding?: "default" | "sm" | "none";
  reveal?: boolean;
  glow?: boolean;
  background?: "default" | "surface" | "mesh";
  container?: boolean;
}

function Section({
  className,
  padding = "default",
  reveal = false,
  glow = false,
  background = "default",
  container = false,
  children,
  ...props
}: SectionProps) {
  // Import conditionally to avoid circular deps if needed, but here it's fine.
  // Assuming ScrollReveal is in ./scroll-reveal
  // Assuming RadialGlow and AmbientMesh are in ./experience/backgrounds
  
  let content = children;
  
  if (container) {
    content = <Container>{content}</Container>;
  }
  
  if (reveal) {
    content = <ScrollReveal direction="up" distance={20}>{content}</ScrollReveal>;
  }

  return (
    <section
      data-slot="section"
      className={cn(
        "relative", // For background positioning
        padding === "default" && "py-8 sm:py-16 lg:py-24",
        padding === "sm"      && "py-6 sm:py-10 lg:py-16",
        padding === "none"    && "py-0",
        background === "surface" && "bg-apyx-surface",
        className
      )}
      {...props}
    >
      {/* Backgrounds */}
      {background === "mesh" && (
        <div className="absolute inset-0 z-[var(--z-mesh)] pointer-events-none opacity-50">
           <AmbientMesh />
        </div>
      )}
      
      {/* Lighting */}
      {glow && (
        <div className="absolute inset-0 z-[var(--z-lighting)] pointer-events-none glow-purple opacity-30" />
      )}
      
      {/* Content */}
      <div className="relative z-[var(--z-content)]">
        {content}
      </div>
    </section>
  );
}

/* ── Grid ───────────────────────────────────────────────────────────── */
/**
 * Strict 12-column responsive grid wrapper.
 */
interface GridProps extends React.ComponentProps<"div"> {
  columns?: 1 | 2 | 3 | 4 | 12;
  gap?: "sm" | "default" | "lg";
}

function Grid({ className, columns = 12, gap = "default", ...props }: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "grid",
        columns === 12 && "grid-cols-4 sm:grid-cols-8 lg:grid-cols-12",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        gap === "sm" && "gap-4",
        gap === "default" && "gap-6",
        gap === "lg" && "gap-8 lg:gap-12",
        className
      )}
      {...props}
    />
  );
}

/* ── PageWrapper ────────────────────────────────────────────────────── */
/**
 * Full-page flex-column wrapper.
 */
interface PageWrapperProps extends React.ComponentProps<"div"> {
  withNavOffset?: boolean;
}

function PageWrapper({
  className,
  withNavOffset = true,
  ...props
}: PageWrapperProps) {
  return (
    <div
      data-slot="page-wrapper"
      className={cn(
        "flex min-h-screen flex-col",
        withNavOffset && "pt-24 lg:pt-[72px]",
        className
      )}
      {...props}
    />
  );
}

export { Container, Section, Grid, PageWrapper };
