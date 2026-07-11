import React from "react";
import { cn } from "@/lib/utils";

/**
 * BentoGrid - A CSS Grid wrapper tailored for the APYX aesthetic.
 * Children should be BentoCard or any standard component.
 */
interface BentoGridProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * BentoCard - Used inside BentoGrid to create bento-style cards that span multiple rows/columns.
 * Uses Card layout internally.
 */
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { RadialGlow } from "./backgrounds";
import { motion } from "framer-motion";
import { cardMotion } from "@/lib/motion";

interface BentoCardProps extends Omit<React.ComponentProps<typeof motion.div>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  span?: 1 | 2 | 3;
}

export function BentoCard({
  title,
  description,
  header,
  icon,
  className,
  span = 1,
  ...props
}: BentoCardProps) {
  return (
    <motion.div
      {...cardMotion}
      className={cn(
        "row-span-1 group/bento flex",
        span === 2 && "md:col-span-2",
        span === 3 && "md:col-span-3",
        className
      )}
      {...props}
    >
      <Card variant="glass" className="w-full h-full flex flex-col justify-between overflow-hidden">
        <RadialGlow />
        
        {/* Custom Header Area (usually for images or visualizations) */}
        {header && (
          <div className="w-full flex-1 min-h-[120px] bg-apyx-bg relative overflow-hidden flex items-center justify-center">
            {header}
          </div>
        )}

        <div className="flex flex-col gap-1 p-6 relative z-10 transition-transform duration-200 group-hover/bento:-translate-y-1">
          {icon && (
            <div className="mb-2 text-apyx-purple">
              {icon}
            </div>
          )}
          {title && (
            <CardTitle className="group-hover/bento:text-apyx-cyan transition-colors">
              {title}
            </CardTitle>
          )}
          {description && (
            <div className="text-sm text-apyx-text-secondary line-clamp-2">
              {description}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
