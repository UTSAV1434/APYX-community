"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Card, CardContent } from "./card";
import { cardMotion } from "@/lib/motion";
import { useExperience } from "./experience/experience-provider";
import { RadialGlow } from "./experience/backgrounds";

interface StatsCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function StatsCard({ 
  label, 
  value, 
  suffix = "", 
  prefix = "",
  duration = 2
}: StatsCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { features } = useExperience();

  useEffect(() => {
    if (isInView) {
      if (!features.enableScrollReveal) {
        setCount(value);
        return;
      }

      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          // Use easeOutQuart for counting animation
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(easeProgress * value));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }
  }, [value, duration, isInView, features.enableScrollReveal]);

  return (
    <motion.div ref={ref} {...cardMotion} className="h-full">
      <Card variant="glass" className="h-full text-center relative overflow-hidden group">
        <RadialGlow />
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2 group-hover:text-apyx-cyan transition-colors drop-shadow-sm">
            {prefix}{count}{suffix}
          </div>
          <div className="text-sm font-medium text-apyx-text-secondary uppercase tracking-wider">
            {label}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
