import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.ComponentProps<"div"> {
  intensity?: "light" | "medium" | "heavy";
  border?: boolean;
}

/**
 * GlassPanel - A reusable wrapper around the APYX glassmorphism CSS utilities.
 */
export function GlassPanel({ 
  className, 
  intensity = "medium", 
  border = true,
  children,
  ...props 
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px]",
        // Base glass utility
        intensity === "light" && "bg-apyx-surface/40 backdrop-blur-md",
        intensity === "medium" && "glass-panel", // Uses our predefined CSS utility
        intensity === "heavy" && "bg-apyx-bg/80 backdrop-blur-2xl",
        
        border && "border border-apyx-border",
        className
      )}
      {...props}
    >
      {/* Subtle top edge highlight to enhance glass effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
