import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Centralized motion tokens for all overlays
export const overlayMotionClasses = 
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

export const overlaySurfaceVariants = cva(
  "z-[200] overflow-hidden rounded-md border border-apyx-border bg-apyx-surface text-apyx-text shadow-md",
  {
    variants: {
      size: {
        auto: "",
        sm: "w-48",
        md: "w-64",
        lg: "w-80",
        xl: "w-96",
        content: "w-[var(--radix-popper-anchor-width)]",
      }
    },
    defaultVariants: {
      size: "auto"
    }
  }
);

export interface OverlaySurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof overlaySurfaceVariants> {
  asChild?: boolean;
}

const OverlaySurface = React.forwardRef<HTMLDivElement, OverlaySurfaceProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(overlaySurfaceVariants({ size }), overlayMotionClasses, className)}
        {...props}
      />
    );
  }
);
OverlaySurface.displayName = "OverlaySurface";

export { OverlaySurface };
