"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Surface, type SurfaceProps } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

const glassVariants = cva(
  // Base glass classes.
  // Note: Padding, radius, elevation, width, and motion are entirely delegated to Surface.
  "relative z-10 before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]",
  {
    variants: {
      variant: {
        default: "bg-apyx-surface/40 border-apyx-border/50",
        subtle: "bg-apyx-bg-alt/30 border-transparent",
        strong: "bg-apyx-surface/70 border-apyx-border/80",
        navigation: "bg-apyx-bg/85 border-b border-apyx-border/50 rounded-none",
        modal: "bg-apyx-surface/80 border-apyx-border",
        floating: "bg-apyx-surface/60 border-apyx-border/60",
        interactive: "bg-apyx-surface/40 border-apyx-border/50 hover:bg-apyx-surface/60 hover:border-apyx-border-alt",
      },
      blur: {
        none: "backdrop-blur-none",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
      },
      opacity: {
        low: "bg-opacity-20",
        medium: "bg-opacity-40",
        high: "bg-opacity-60",
      },
      glow: {
        none: "",
        soft: "before:bg-apyx-purple/5 before:blur-xl",
        brand: "before:bg-apyx-purple/15 before:blur-2xl",
        focus: "focus-within:before:bg-apyx-purple/20 focus-within:before:blur-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      blur: "md",
      glow: "none",
    },
  }
);

export interface GlassPanelProps 
  extends Omit<SurfaceProps, "variant">, 
    VariantProps<typeof glassVariants> {
  noise?: boolean;
  animated?: boolean;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    { 
      className, 
      variant, 
      blur, 
      opacity, 
      glow, 
      noise = false, 
      animated = false, 
      hoverable = false,
      children, 
      ...surfaceProps 
    }, 
    ref
  ) => {
    
    // We compose Surface, but override its background/border visually with Glass.
    // By passing variant="transparent" to Surface, we let Surface handle the physical geometry 
    // (padding, radius, shadow, width) and interaction (hoverable, focusable, pressable), 
    // while we paint the glass over it.
    
    return (
      <Surface
        ref={ref}
        variant="transparent" // Delegate purely structural geometry to Surface
        hoverable={hoverable || variant === "interactive"}
        className={cn(
          glassVariants({ variant, blur, opacity, glow }),
          animated && "animate-fade-in-up",
          className
        )}
        {...surfaceProps}
      >
        {/* Top Edge Highlight for premium depth */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        
        {/* Optional Noise Texture Layer */}
        {noise && (
          <div 
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay rounded-[inherit]" 
            style={{ backgroundImage: 'url("/noise.png")' }}
          />
        )}
        
        {/* Content Wrapper */}
        <div className="relative z-10 size-full">
          {children}
        </div>
      </Surface>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
