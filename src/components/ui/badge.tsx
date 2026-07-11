// @locked
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps, MotionProps } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { transitionFast } from "@/lib/motion";

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple focus-visible:ring-offset-2 focus-visible:ring-offset-apyx-bg relative",
  {
    variants: {
      variant: {
        default: "bg-apyx-surface text-apyx-text-secondary border border-apyx-border",
        brand: "bg-apyx-purple text-white border-transparent",
        glass: "bg-apyx-surface/50 backdrop-blur-md border border-apyx-border/50 text-white",
        outline: "bg-transparent border border-apyx-border text-white",
        success: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30",
        warning: "bg-amber-500/10 text-amber-500 border border-amber-500/30",
        destructive: "bg-destructive/10 text-destructive border border-destructive/30",
        info: "bg-apyx-cyan/10 text-apyx-cyan border border-apyx-cyan/30",
        neutral: "bg-apyx-surface text-apyx-text-secondary border border-apyx-border",
        featured: "bg-gradient-brand text-white border-transparent shadow-elevation-2 glow-purple",
        
        // Legacy aliases to prevent sudden breakages before we refactor
        secondary: "bg-apyx-surface text-apyx-text-secondary border border-apyx-border",
        danger: "bg-destructive/10 text-destructive border border-destructive/30",
        ghost: "bg-transparent border-transparent text-white",
        link: "bg-transparent text-apyx-purple hover:underline p-0 h-auto",
      },
      size: {
        xs: "h-5 px-2 text-[10px] [&_svg]:size-3",
        sm: "h-6 px-2.5 text-xs [&_svg]:size-3.5",
        md: "h-7 px-3 text-sm [&_svg]:size-4",
        lg: "h-8 px-3.5 text-sm [&_svg]:size-4",
      },
      shape: {
        default: "rounded-md",
        rounded: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-none",
      },
      selected: {
        true: "",
        false: "",
      },
      clickable: {
        true: "cursor-pointer after:absolute after:inset-0 after:m-auto after:min-w-[44px] after:min-h-[44px] after:content-['']",
        false: "",
      }
    },
    compoundVariants: [
      {
        variant: "outline",
        selected: true,
        className: "bg-apyx-surface border-apyx-border-alt text-white shadow-elevation-1",
      },
      {
        variant: "neutral",
        selected: true,
        className: "bg-apyx-border text-white",
      }
    ],
    defaultVariants: {
      variant: "default",
      size: "sm",
      shape: "pill",
      selected: false,
      clickable: false,
    },
  }
);

export interface BadgeProps 
  extends Omit<React.HTMLAttributes<HTMLSpanElement | HTMLButtonElement>, "prefix">, 
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  removable?: boolean;
  onRemove?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  disabled?: boolean;
  interactive?: boolean; // legacy alias
}

export const Badge = React.forwardRef<HTMLSpanElement | HTMLButtonElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      selected,
      clickable,
      interactive, // alias for clickable
      disabled,
      leftIcon,
      rightIcon,
      removable,
      onRemove,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    
    // Support legacy 'interactive' prop acting as 'clickable'
    const isClickableState = clickable || interactive || !!onClick;
    const isDisabled = disabled;
    
    // Determine the component type
    const Component = isClickableState ? motion.button : motion.span;
    
    // Interactions
    const motionProps: MotionProps = (isClickableState && !isDisabled) ? {
      whileHover: { y: -1, filter: "brightness(1.1)" },
      whileTap: { scale: 0.96 },
      transition: transitionFast,
    } : {};

    const combinedClassName = cn(
      badgeVariants({ variant, size, shape, selected, clickable: isClickableState }),
      isDisabled && "opacity-50 pointer-events-none",
      className
    );

    return (
      <Component
        ref={ref as any}
        className={combinedClassName}
        onClick={isDisabled ? undefined : onClick}
        type={isClickableState ? "button" : undefined}
        aria-disabled={isDisabled ? true : undefined}
        aria-pressed={isClickableState ? selected : undefined}
        {...motionProps}
        {...(props as any)}
      >
        {leftIcon}
        <span className="z-10 truncate">{children}</span>
        {rightIcon}
        
        {removable && (
          <button
            type="button"
            aria-label="Remove"
            disabled={isDisabled}
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(e);
            }}
            className={cn(
              "z-10 ml-0.5 rounded-full p-0.5 opacity-70 transition-colors hover:bg-black/20 hover:opacity-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple",
              isDisabled && "pointer-events-none"
            )}
          >
            <X className="size-3" aria-hidden="true" />
          </button>
        )}
      </Component>
    );
  }
);

Badge.displayName = "Badge";
