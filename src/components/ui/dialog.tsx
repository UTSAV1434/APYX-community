/**
 * APYX Dialog (Modal) Component
 * Source: .ai/04-components.md · .ai/09-animation-specifications.md § 15
 * Source: .ai/15-accessibility.md — modals section
 *
 * Built on Base UI's Dialog primitive — focus trap, Escape key, and
 * ARIA roles are handled by Base UI automatically.
 *
 * Spec:
 *   Backdrop:  bg-black/80 + blur-md
 *   Content:   bg-apyx-surface · rounded-[20px] · border-apyx-border
 *   Animation: Fade + Scale (via Base UI data-attributes)
 *   Max-width: 448px (sm:max-w-md) or 560px (lg:max-w-lg)
 *
 * Sub-components: Dialog · DialogTrigger · DialogPortal · DialogClose ·
 *                 DialogOverlay · DialogContent · DialogHeader ·
 *                 DialogFooter · DialogTitle · DialogDescription
 */

"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

/* ── Root / Trigger / Portal / Close ─────────────────────────────── */

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/* ── Overlay (Backdrop) ────────────────────────────────────────────── */

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        // Base
        "fixed inset-0 isolate z-50",
        // APYX spec: black/80 + backdrop blur
        "bg-black/80 backdrop-blur-md",
        // Base UI animation hooks
        "duration-[250ms] supports-backdrop-filter:backdrop-blur-md",
        "data-open:animate-in data-open:fade-in-0",
        "data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  );
}

/* ── Content ───────────────────────────────────────────────────────── */

function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = "md",
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  /** "sm" = 384px · "md" = 448px (default) · "lg" = 560px · "full" = screen */
  size?: "sm" | "md" | "lg" | "full";
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          // ── Positioning ────────────────────────────────────────
          "fixed top-1/2 left-1/2 z-50",
          "-translate-x-1/2 -translate-y-1/2",
          "w-full max-w-[calc(100%-2rem)]",
          // ── Size variants ──────────────────────────────────────
          size === "sm"   && "sm:max-w-sm",
          size === "md"   && "sm:max-w-md",
          size === "lg"   && "sm:max-w-lg",
          size === "full" && "sm:max-w-screen-md",
          // ── Visual ────────────────────────────────────────────
          "grid gap-0 overflow-hidden",
          "rounded-[20px]",                      // spec: large radius
          "border border-apyx-border",
          "bg-apyx-surface",
          "text-sm text-foreground",
          // ── Shadow ────────────────────────────────────────────
          "shadow-[0_24px_64px_rgba(0,0,0,0.6)]",
          // ── Animation — Base UI data-attribute hooks ──────────
          "outline-none",
          "duration-[350ms]",
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
          "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}

        {/* Close button — positioned top-right */}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                className="absolute top-4 right-4 text-apyx-text-muted hover:text-white"
                aria-label="Close dialog"
              />
            }
          >
            <XIcon aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

/* ── Header ────────────────────────────────────────────────────────── */

function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1.5 px-6 pt-6 pb-4",
        className
      )}
      {...props}
    />
  );
}

/* ── Footer ────────────────────────────────────────────────────────── */

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { showCloseButton?: boolean }) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 px-6 py-4",
        "border-t border-apyx-border bg-apyx-bg/50",
        "sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          render={<Button variant="outline" />}
        >
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

/* ── Title ─────────────────────────────────────────────────────────── */

function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-xl font-bold leading-none text-white",
        className
      )}
      {...props}
    />
  );
}

/* ── Description ───────────────────────────────────────────────────── */

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-apyx-text-secondary leading-relaxed",
        "*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-white",
        className
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
