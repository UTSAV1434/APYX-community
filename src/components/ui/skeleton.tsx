"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "shimmer shrink-0",
  {
    variants: {
      variant: {
        default: "",
        subtle: "opacity-50",
        glass: "bg-apyx-surface-alt/50 backdrop-blur-md border border-white/5",
      },
      preset: {
        none: "",
        line: "h-px w-full",
        text: "h-4 w-full rounded-md",
        title: "h-8 w-3/4 rounded-lg",
        avatar: "h-10 w-10 rounded-full",
        button: "h-10 w-24 rounded-lg",
        card: "h-32 w-full rounded-xl",
        image: "h-48 w-full rounded-xl",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      preset: "text",
    },
  }
);

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, preset, rounded, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, preset, rounded }), className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export function SkeletonText({ lines = 1, lastLineWidth, className, ...props }: SkeletonProps & { lines?: number; lastLineWidth?: string | number }) {
  if (lines === 1) return <Skeleton preset="text" className={className} {...props} />;
  
  return (
    <div className={cn("space-y-2 w-full", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          preset="text" 
          style={i === lines - 1 && lastLineWidth ? { width: lastLineWidth } : undefined} 
          {...props} 
        />
      ))}
    </div>
  );
}


