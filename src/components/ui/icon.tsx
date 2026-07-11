import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────────────────────────────────
// ICON VARIANTS
// ────────────────────────────────────────────────────────────────────────────

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
      hero: "size-12",
    },
    color: {
      primary: "text-apyx-text",
      secondary: "text-apyx-text-secondary",
      muted: "text-apyx-text-muted",
      brand: "text-apyx-purple",
      success: "text-apyx-emerald",
      warning: "text-apyx-amber",
      destructive: "text-apyx-rose",
      info: "text-apyx-info",
      inherit: "text-inherit",
    },
    animate: {
      pulse: "animate-pulse motion-reduce:animate-none",
      spin: "animate-spin motion-reduce:animate-none",
      bounce: "animate-bounce motion-reduce:animate-none",
      float: "animate-bounce motion-reduce:animate-none",
    },
    interaction: {
      "hover-rotate": "transition-transform hover:rotate-180 motion-reduce:transition-none",
      "hover-scale": "transition-transform hover:scale-110 motion-reduce:transition-none",
      "group-hover-rotate": "transition-transform group-hover:rotate-180 motion-reduce:transition-none",
    },
    rotation: {
      0: "rotate-0",
      90: "rotate-90",
      180: "rotate-180",
      270: "rotate-270",
    },
    flip: {
      horizontal: "scale-x-[-1]",
      vertical: "scale-y-[-1]",
      both: "scale-x-[-1] scale-y-[-1]",
    },
  },
  defaultVariants: {
    size: "md",
    color: "inherit",
  },
});

const strokeMapping = {
  thin: 1.5,
  regular: 2,
  bold: 2.5,
};

export interface IconProps extends Omit<VariantProps<typeof iconVariants>, "rotation"> {
  /** The Lucide icon component */
  icon: LucideIcon;
  /** Custom stroke width */
  stroke?: keyof typeof strokeMapping;
  /** Whether the icon is purely decorative (hides it from screen readers) */
  decorative?: boolean;
  /** Accessible label for the icon, required if decorative is false */
  "aria-label"?: string;
  /** Additional custom classes */
  className?: string;
  /** Numeric rotation in degrees */
  rotation?: 0 | 90 | 180 | 270;
}

// ────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ────────────────────────────────────────────────────────────────────────────

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: LucideComponent,
      size,
      color,
      animate,
      interaction,
      rotation,
      flip,
      stroke = "regular",
      decorative = true,
      "aria-label": ariaLabel,
      className,
      ...props
    },
    ref
  ) => {
    if (process.env.NODE_ENV !== "production") {
      if (!decorative && !ariaLabel) {
        console.warn(
          "Icon component requires an 'aria-label' when 'decorative' is false."
        );
      }
    }

    const strokeWidth = strokeMapping[stroke];

    return (
      <LucideComponent
        ref={ref}
        className={cn(
          iconVariants({ size, color, animate, interaction, rotation: rotation as any, flip }),
          className
        )}
        strokeWidth={strokeWidth}
        aria-hidden={decorative ? "true" : undefined}
        aria-label={!decorative ? ariaLabel : undefined}
        role={!decorative ? "img" : undefined}
        {...props}
      />
    );
  }
);
Icon.displayName = "Icon";
