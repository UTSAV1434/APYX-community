/**
 * APYX Card Component
 * Source: .ai/04-components.md · .ai/12-design-tokens.md
 * Source: .ai/09-animation-specifications.md § 9. Cards
 *
 * Spec values:
 *   Background: #141B34 (apyx-surface)
 *   Border:     #1F2947 (apyx-border), 1px
 *   Radius:     20px (rounded-[20px]) — spec "Card Radius"
 *   Padding:    24px (p-6)
 *   Hover:      lift 2px + border highlight + shadow glow
 *
 * Variants:
 *   default   — Standard card with hover lift
 *   glass     — Glassmorphism card (hero floaters, overlays)
 *   elevated  — High-contrast featured card with stronger shadow
 *   flat      — No hover effect (for dashboard, data tables)
 *
 * Sub-components: CardHeader · CardTitle · CardDescription ·
 *                 CardAction · CardContent · CardFooter
 */

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Card ──────────────────────────────────────────────────────────── */

interface CardProps extends React.ComponentProps<"div"> {
  /** Visual style variant */
  variant?: "default" | "glass" | "elevated" | "flat";
}

function Card({
  className,
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(
        // ── Base ────────────────────────────────────────────────
        "group/card relative flex flex-col overflow-hidden",
        "rounded-[20px]",                         // spec: 20px card radius
        "text-sm text-foreground",

        // ── Default variant ──────────────────────────────────────
        variant === "default" && [
          "border border-apyx-border bg-apyx-surface",
          // Hover: lift 2px + border highlight + shadow per spec § 9
          "transition-all duration-[250ms]",
          "hover:-translate-y-0.5",
          "hover:border-apyx-purple/40",
          "hover:shadow-[0_8px_24px_rgba(176,38,255,0.1)]",
        ],

        // ── Glass variant ────────────────────────────────────────
        variant === "glass" && [
          "glass-card",
          "transition-all duration-[250ms]",
          "hover:-translate-y-0.5",
          "hover:shadow-[0_8px_24px_rgba(176,38,255,0.12)]",
        ],

        // ── Elevated variant ─────────────────────────────────────
        variant === "elevated" && [
          "border border-apyx-border bg-apyx-surface",
          "shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
          "transition-all duration-[250ms]",
          "hover:-translate-y-1",
          "hover:border-apyx-purple/50",
          "hover:shadow-[0_12px_32px_rgba(176,38,255,0.2)]",
        ],

        // ── Flat variant — no hover ──────────────────────────────
        variant === "flat" && [
          "border border-apyx-border bg-apyx-surface",
        ],

        className
      )}
      {...props}
    />
  );
}

/* ── CardHeader ────────────────────────────────────────────────────── */

function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1 px-6 pt-6",
        // Action slot support: title + action side-by-side
        "has-data-[slot=card-action]:flex-row has-data-[slot=card-action]:items-start",
        className
      )}
      {...props}
    />
  );
}

/* ── CardTitle ─────────────────────────────────────────────────────── */

function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-lg font-bold leading-snug text-white flex-1",
        className
      )}
      {...props}
    />
  );
}

/* ── CardDescription ───────────────────────────────────────────────── */

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-apyx-text-secondary leading-relaxed", className)}
      {...props}
    />
  );
}

/* ── CardAction ────────────────────────────────────────────────────── */

/** Right-aligned action slot in the card header */
function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto flex-shrink-0 self-start", className)}
      {...props}
    />
  );
}

/* ── CardContent ───────────────────────────────────────────────────── */

function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 py-4", className)}
      {...props}
    />
  );
}

/* ── CardFooter ────────────────────────────────────────────────────── */

function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2 px-6 pb-6 pt-0",
        // Optional border-top for footers with `border-t` class
        "[.border-t]:pt-4",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
