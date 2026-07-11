/**
 * @locked
 * This component is LOCKED by the lead architect.
 * Do not modify this foundational primitive without explicit permission.
 * It serves as the purely structural base for all APYX components.
 * No glass, no gradients, no decorative effects.
 */
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const surfaceVariants = cva(
  // Base structural classes. Notice: NO glass, NO gradients, NO lighting here.
  "relative transition-all duration-300 outline-none",
  {
    variants: {
      variant: {
        default: "bg-apyx-surface border border-apyx-border",
        subtle: "bg-apyx-bg-alt/50 border border-transparent",
        elevated: "bg-apyx-surface border border-apyx-border",
        outlined: "bg-transparent border border-apyx-border",
        filled: "bg-apyx-surface border-transparent",
        transparent: "bg-transparent border-transparent",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-12",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
        pill: "rounded-[999px]",
      },
      elevation: {
        flat: "shadow-none",
        raised: "shadow-elevation-1",
        floating: "shadow-elevation-2",
        overlay: "shadow-overlay",
        modal: "shadow-modal",
        toast: "shadow-toast",
      },
      width: {
        auto: "w-auto",
        fit: "w-fit",
        full: "w-full",
      },
      overflow: {
        visible: "overflow-visible",
        hidden: "overflow-hidden",
        auto: "overflow-auto",
      },
      disabled: {
        true: "opacity-40 pointer-events-none cursor-not-allowed",
        false: "",
      },
      selected: {
        true: "border-apyx-purple ring-1 ring-apyx-purple",
        false: "",
      },
      loading: {
        true: "pointer-events-none shimmer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      radius: "xl",
      elevation: "flat",
      width: "auto",
      overflow: "hidden",
      disabled: false,
      selected: false,
      loading: false,
    },
  }
);

export interface SurfaceProps 
  extends Omit<HTMLMotionProps<"div">, "children" | "title">, 
    VariantProps<typeof surfaceVariants> {
  children?: React.ReactNode;
  hoverable?: boolean;
  pressable?: boolean;
  focusable?: boolean;
  loading?: boolean;
  selected?: boolean;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      className,
      variant,
      padding,
      radius,
      elevation,
      width,
      overflow,
      disabled,
      selected,
      loading,
      hoverable = false,
      pressable = false,
      focusable = false,
      children,
      whileHover,
      whileTap,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          surfaceVariants({
            variant,
            padding,
            radius,
            elevation,
            width,
            overflow,
            disabled,
            selected,
            loading,
          }),
          // Add Tailwind interaction states
          !disabled && !loading && [
            hoverable && "hover:border-apyx-border-alt hover:shadow-elevation-2 cursor-pointer",
            focusable && "focus-visible:ring-2 focus-visible:ring-apyx-purple focus-visible:ring-offset-2 focus-visible:ring-offset-apyx-bg",
          ],
          className
        )}
        // Apply Framer Motion interaction states if enabled
        whileHover={hoverable && !disabled && !loading ? { y: -2, ...((whileHover as object) || {}) } : whileHover}
        whileTap={pressable && !disabled && !loading ? { scale: 0.98, ...((whileTap as object) || {}) } : whileTap}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Surface.displayName = "Surface";
