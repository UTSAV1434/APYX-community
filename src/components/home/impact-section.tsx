"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Users, Code2, Rocket, Globe } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { label: "Active Members", value: 500, suffix: "+", icon: Users, color: "text-apyx-purple" },
  { label: "Projects Built", value: 120, suffix: "+", icon: Code2, color: "text-apyx-blue" },
  { label: "Hackathons Hosted", value: 15, suffix: "", icon: Rocket, color: "text-apyx-emerald" },
  { label: "Partner Companies", value: 25, suffix: "+", icon: Globe, color: "text-apyx-cyan" },
];

export function ImpactSection() {
  return (
    <section className="section-padding container-wide relative z-10">
      <div className="relative rounded-3xl border border-apyx-border bg-apyx-surface overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-gradient-brand opacity-5 blur-[100px] pointer-events-none" />
        
        <div className="grid lg:grid-cols-2 gap-12 p-8 sm:p-12 lg:p-16 relative z-10">
          
          <ScrollReveal direction="right" className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-6 leading-tight">
              Driving <span className="text-gradient">Real Impact</span> on Campus.
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-white/70 leading-relaxed">
                Since our founding, APYX has transformed the student tech landscape by providing the resources, mentorship, and platform needed to turn ideas into reality.
              </p>
            </div>
            
            {/* Simple sparkline visual representation */}
            <div className="mt-auto">
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Growth Trajectory</p>
              <div className="flex items-end h-24 gap-2 w-full max-w-md">
                {[15, 25, 45, 30, 60, 50, 80, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    className="flex-1 bg-gradient-to-t from-apyx-purple/20 to-apyx-cyan rounded-t-sm"
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal 
                key={stat.label} 
                direction="up" 
                delay={0.1 * i}
                className="bg-apyx-bg border border-apyx-border rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center group hover:border-apyx-purple/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-apyx-surface flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-medium text-apyx-text-secondary">
                  {stat.label}
                </p>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
