"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Icons } from "@/components/ui/icons";
import { Text } from "@/components/ui/typography";

const loadingOverlayVariants = cva(
  "z-50 flex flex-col items-center justify-center bg-apyx-bg/80 backdrop-blur-sm transition-all duration-300 animate-in fade-in-0",
  {
    variants: {
      mode: {
        fullscreen: "fixed inset-0",
        container: "absolute inset-0 rounded-inherit",
      },
    },
    defaultVariants: {
      mode: "container",
    },
  }
);

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loadingOverlayVariants> {
  message?: string;
  progress?: number; // 0 to 100
  preventInteraction?: boolean;
}

export const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ className, mode, message, progress, preventInteraction = true, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(
          loadingOverlayVariants({ mode }), 
          preventInteraction ? "pointer-events-auto" : "pointer-events-none",
          className
        )} 
        aria-busy="true" 
        aria-live="polite" 
        {...props}
      >
        <div className="flex flex-col items-center gap-4">
          <Icon 
            icon={Icons.loader} 
            size="lg" 
            className="animate-spin text-apyx-purple" 
            decorative 
          />
          
          {(message || typeof progress === "number") && (
            <div className="flex flex-col items-center gap-2 text-center">
              {message && (
                <Text className="font-medium">
                  {message}
                </Text>
              )}
              {typeof progress === "number" && (
                <div className="w-48 h-1.5 bg-apyx-surface-alt rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-apyx-purple transition-all duration-300 ease-out"
                    style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

LoadingOverlay.displayName = "LoadingOverlay";
