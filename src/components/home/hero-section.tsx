"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SPRINGS } from "@/lib/motion";
import { Heading, Text } from "@/components/ui/typography";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  heroData?: {
    badge_text: string;
    title: string;
    subtitle: string;
    cta_text: string;
  };
}

export function HeroSection({ heroData }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Magnetic button effect
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnPos({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  const transition = SPRINGS.slow;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a] pt-32 pb-24 lg:pt-0 lg:pb-0"
    >
      {/* Abstract Breathing Geometry */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[1200px] h-[800px] bg-gradient-radial from-apyx-purple/20 via-apyx-purple/5 to-transparent rounded-[100%] blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[10%] right-[10%] w-[800px] h-[600px] bg-gradient-radial from-apyx-cyan/15 via-apyx-cyan/5 to-transparent rounded-[100%] blur-[100px]" 
        />
        
        {/* Deep mask for infinite depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]" />
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="container-wide relative z-20 px-4 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center h-full">
          
          {/* Content Column - Vast Negative Space */}
          <div className="flex flex-col items-start text-left max-w-2xl py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.1 }}
              className="mb-10"
            >
              <Badge variant="glass" size="md" className="border-white/5 bg-white/[0.02] text-white/60 backdrop-blur-xl px-4 py-1.5 h-auto relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:animate-shimmer" />
                {heroData?.badge_text || "APYX ECOSYSTEM"}
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.3 }}
            >
              <Heading as="h1" className="text-5xl sm:text-6xl lg:text-[5.5rem] tracking-tight leading-[1.02] font-semibold text-white">
                {heroData?.title || "The operating system for ambition."}
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.5 }}
            >
              <Text className="mt-8 text-xl sm:text-2xl text-apyx-text-secondary leading-relaxed max-w-lg font-light">
                {heroData?.subtitle || "An elite network of builders, scaling the next generation of technology through relentless execution and shared vision."}
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.7 }}
              className="mt-14"
            >
              <motion.a
                ref={btnRef}
                href="/join"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: btnPos.x, y: btnPos.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                className={cn(
                  "group relative inline-flex items-center justify-center h-14 px-8 text-base font-medium text-white transition-all duration-300",
                  "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full",
                  "shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]"
                )}
              >
                <span className="relative z-10 flex items-center">
                  {heroData?.cta_text || "Join the Network"}
                  <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-apyx-purple/0 via-apyx-purple/10 to-apyx-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Visual Anchor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="hidden lg:block relative h-full w-full pointer-events-none"
          >
            {/* The right side is intentionally left minimal for this section, creating a massive counter-balance of deep atmospheric light. */}
          </motion.div>

        </div>
      </motion.div>
      
      {/* Bottom gradient seamlessly blending into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-30" />
    </section>
  );
}
