"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { transitionEntrance } from "@/lib/motion";
import { useExperience } from "./experience-provider";

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const { features } = useExperience();

  // Glow line that fills up as you scroll down
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={cn("relative mx-auto max-w-4xl px-4 md:px-0", className)} ref={ref}>
      {/* Background track line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-apyx-border transform md:-translate-x-1/2" />
      
      {/* Animated glowing line */}
      {features.enableGlows && (
        <motion.div 
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-apyx-purple via-apyx-cyan to-transparent transform md:-translate-x-1/2 origin-top glow-purple"
          style={{ scaleY }}
        />
      )}

      <div className="flex flex-col gap-12 md:gap-24 relative py-12">
        {children}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  title: string;
  time?: string;
  description?: string;
  isLeft?: boolean;
  icon?: React.ReactNode;
}

export function TimelineItem({ 
  title, 
  time, 
  description, 
  isLeft = true,
  icon
}: TimelineItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={transitionEntrance}
      className={cn(
        "relative flex flex-col md:flex-row items-start",
        isLeft ? "md:justify-start" : "md:justify-end"
      )}
    >
      {/* Node / dot */}
      <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-apyx-surface border-2 border-apyx-purple flex items-center justify-center transform -translate-x-1/2 z-10 glow-purple">
        {icon ? (
          <div className="text-apyx-purple w-4 h-4">{icon}</div>
        ) : (
          <div className="w-2 h-2 rounded-full bg-apyx-cyan" />
        )}
      </div>

      {/* Content */}
      <div className={cn(
        "ml-12 md:ml-0 md:w-5/12",
        isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"
      )}>
        {time && (
          <div className="text-xs font-bold uppercase tracking-wider text-apyx-cyan mb-1">
            {time}
          </div>
        )}
        <h3 className="text-xl font-bold font-heading text-white mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-apyx-text-secondary leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
