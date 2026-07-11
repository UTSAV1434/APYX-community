"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/ui/surface";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Icon as ApyxIcon } from "@/components/ui/icon";
import { Icons, type APYXIcon } from "@/components/ui/icons";
import { Text, Heading } from "@/components/ui/typography";

const emptyStateVariants = cva(
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

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof emptyStateVariants> {
  icon?: APYXIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  illustration?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant, icon, title, description, action, illustration, ...props }, ref) => {
    const content = (
      <div className={cn(emptyStateVariants({ variant }), className)} ref={ref} {...props}>
        {illustration && (
          <div className="mb-6 flex justify-center">
            {illustration}
          </div>
        )}
        {!illustration && icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-apyx-surface-alt text-apyx-text-muted">
            <ApyxIcon icon={Icons[icon]} size="md" decorative />
          </div>
        )}
        <Heading variant="h4" className="mb-2">
          {title}
        </Heading>
        {description && (
          <Text color="muted" className="mb-6 max-w-sm">
            {description}
          </Text>
        )}
        {action && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
            {action}
          </div>
        )}
      </div>
    );

    if (variant === "glass") {
      return (
        <GlassPanel className="w-full h-full">
          {content}
        </GlassPanel>
      );
    }

    if (variant === "default") {
      return (
        <Surface variant="default" className="w-full h-full">
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

EmptyState.displayName = "EmptyState";
