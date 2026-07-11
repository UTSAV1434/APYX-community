/**
 * APYX Sheet (Drawer) Component
 * Source: .ai/04-components.md · .ai/09-animation-specifications.md
 * Source: .ai/15-accessibility.md — "Mobile: Slide-in drawer with blurred backdrop"
 *
 * Built on Base UI's Dialog primitive — same focus trap and Escape key
 * behavior as the Dialog, with side-anchored animation.
 *
 * Spec:
 *   Backdrop:  bg-black/80 + blur-md (same as Dialog)
 *   Content:   bg-apyx-bg · border-apyx-border
 *   Sides:     right (default) · left · top · bottom
 *   Animation: Slide in from side (via Base UI data-attributes)
 *
 * Sub-components: Sheet · SheetTrigger · SheetPortal · SheetClose ·
 *                 SheetContent · SheetHeader · SheetFooter ·
 *                 SheetTitle · SheetDescription
 */

"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

/* ── Root / Trigger / Portal / Close ─────────────────────────────── */

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/* ── Overlay (Backdrop) ────────────────────────────────────────────── */

function SheetOverlay({
  className,
  ...props
}: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50",
        // APYX spec: same backdrop as dialog
        "bg-black/80 backdrop-blur-md",
        "transition-opacity duration-[250ms]",
        "data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

/* ── Content ───────────────────────────────────────────────────────── */

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          // ── Base ──────────────────────────────────────────────
          "fixed z-50 flex flex-col",
          "border-apyx-border bg-apyx-bg",
          "text-sm text-foreground",
          "shadow-[0_0_64px_rgba(0,0,0,0.8)]",
          "outline-none",
          // ── Animation duration ─────────────────────────────────
          "transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          // ── Side: right (default) ──────────────────────────────
          side === "right" && [
            "inset-y-0 right-0 h-full w-3/4 border-l",
            "sm:max-w-sm",
            "data-starting-style:translate-x-full data-ending-style:translate-x-full",
          ],
          // ── Side: left ─────────────────────────────────────────
          side === "left" && [
            "inset-y-0 left-0 h-full w-3/4 border-r",
            "sm:max-w-sm",
            "data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
          ],
          // ── Side: bottom ───────────────────────────────────────
          side === "bottom" && [
            "inset-x-0 bottom-0 h-auto border-t",
            "rounded-t-[20px]",
            "data-starting-style:translate-y-full data-ending-style:translate-y-full",
          ],
          // ── Side: top ──────────────────────────────────────────
          side === "top" && [
            "inset-x-0 top-0 h-auto border-b",
            "rounded-b-[20px]",
            "data-starting-style:-translate-y-full data-ending-style:-translate-y-full",
          ],
          className
        )}
        {...props}
      >
        {children}

        {/* Close button — positioned top-right */}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                className="absolute top-4 right-4 text-apyx-text-muted hover:text-white"
                aria-label="Close drawer"
              />
            }
          >
            <XIcon aria-hidden="true" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

/* ── Header ────────────────────────────────────────────────────────── */

function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1 px-6 py-5",
        "border-b border-apyx-border",
        className
      )}
      {...props}
    />
  );
}

/* ── Footer ────────────────────────────────────────────────────────── */

function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col gap-2 px-6 py-5",
        "border-t border-apyx-border",
        className
      )}
      {...props}
    />
  );
}

/* ── Title ─────────────────────────────────────────────────────────── */

function SheetTitle({
  className,
  ...props
}: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-lg font-bold text-white",
        className
      )}
      {...props}
    />
  );
}

/* ── Description ───────────────────────────────────────────────────── */

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-apyx-text-secondary", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
