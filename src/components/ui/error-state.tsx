"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/ui/surface";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Icon as ApyxIcon } from "@/components/ui/icon";
import { Icons, type APYXIcon } from "@/components/ui/icons";
import { Text, Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

const errorStateVariants = cva(
  "flex flex-col items-center justify-center text-center p-8",
  {
    variants: {
      variant: {
        default: "",
        minimal: "p-4 bg-transparent border-none shadow-none",
        glass: "",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export type ErrorSeverity = "warning" | "error" | "fatal";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof errorStateVariants> {
  severity?: ErrorSeverity;
  icon?: APYXIcon;
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  secondaryAction?: React.ReactNode;
  errorCode?: string;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ 
    className, 
    variant, 
    severity = "error",
    icon, 
    title = "Something went wrong", 
    description = "We're having trouble loading this content. Please try again.", 
    onRetry, 
    retryLabel = "Retry", 
    secondaryAction, 
    errorCode, 
    ...props 
  }, ref) => {
    
    // Resolve defaults based on severity
    const defaultIcon = severity === "warning" ? "alertTriangle" : "alertCircle";
    const resolvedIcon = icon || defaultIcon;

    const iconColors = {
      warning: "bg-apyx-amber/10 text-apyx-amber",
      error: "bg-apyx-rose/10 text-apyx-rose",
      fatal: "bg-apyx-rose/20 text-apyx-rose ring-1 ring-apyx-rose/30",
    };
    
    const content = (
      <div className={cn(errorStateVariants({ variant }), className)} ref={ref} {...props}>
        <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-full", iconColors[severity])}>
          <ApyxIcon icon={Icons[resolvedIcon]} size="md" decorative />
        </div>
        
        <Heading variant="h4" className="mb-2">
          {title}
        </Heading>
        
        <Text color="muted" className="mb-6 max-w-sm">
          {description}
        </Text>

        {(onRetry || secondaryAction) && (
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
            {onRetry && (
              <Button variant="primary" onClick={onRetry}>
                {retryLabel}
              </Button>
            )}
            {secondaryAction}
          </div>
        )}

        {errorCode && (
          <Text color="muted" className="text-xs uppercase tracking-wider font-mono opacity-60">
            Error Code: {errorCode}
          </Text>
        )}
      </div>
    );

    if (variant === "glass") {
      const borderColors = {
        warning: "border-apyx-amber/20",
        error: "border-apyx-rose/20",
        fatal: "border-apyx-rose/40 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
      };
      return (
        <GlassPanel className={cn("w-full h-full", borderColors[severity])}>
          {content}
        </GlassPanel>
      );
    }

    if (variant === "default") {
      return (
        <Surface variant="default" className="w-full h-full border-apyx-rose/20">
          {content}
        </Surface>
      );
    }

    // minimal
    return (
      <div className="w-full h-full">
        {content}
      </div>
    );
  }
);

ErrorState.displayName = "ErrorState";
