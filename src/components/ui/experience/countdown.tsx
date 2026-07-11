"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

export function Countdown({ targetDate, className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className={cn("flex items-center gap-2 sm:gap-4", className)}>
      {timeBlocks.map((block, i) => (
        <React.Fragment key={block.label}>
          <div className="flex flex-col items-center">
            <div className="bg-apyx-bg border border-apyx-border w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
              {/* Glass sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <span className="text-xl sm:text-2xl font-bold font-heading text-white">
                {block.value.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-apyx-text-muted uppercase tracking-widest mt-2 font-medium">
              {block.label}
            </span>
          </div>
          {i < timeBlocks.length - 1 && (
            <div className="text-apyx-purple font-bold text-xl sm:text-2xl pb-6 animate-pulse">
              :
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
