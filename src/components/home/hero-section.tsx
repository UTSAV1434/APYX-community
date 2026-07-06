"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles, MessageCircle, Hash, Camera, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useEffect, useRef } from "react";

// Helper component for 3D mouse parallax tilt
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 flex flex-col items-center justify-start overflow-hidden bg-[#0a0a0a]">
      
      {/* Dynamic Background Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-apyx-purple/30 rounded-[100%] blur-[120px]" />
        {/* Bottom Left Glow */}
        <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] bg-apyx-cyan/20 rounded-[100%] blur-[100px]" />
        {/* Bottom Right Glow */}
        <div className="absolute top-[50%] -right-20 w-[600px] h-[600px] bg-apyx-amber/10 rounded-[100%] blur-[120px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container-wide px-4 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-white/80 font-medium"
        >
          <span className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apyx-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-apyx-cyan" />
          </span>
          Dream bigger. Build faster.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-bold font-heading leading-[1.05] tracking-tight max-w-5xl"
        >
          The future of <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-apyx-cyan via-apyx-purple to-apyx-rose">APYX innovation.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-8 text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed"
        >
          Join the world's most ambitious ecosystem of creators, developers, and designers building the next generation of technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 text-base font-bold transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Join the Community
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56 bg-apyx-surface border-apyx-border text-white">
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                <a href="https://discord.gg/apyx" target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                <a href="https://twitter.com/apyx" target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                  <Hash className="w-4 h-4 mr-2" />
                  Twitter
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                <a href="https://instagram.com/apyx" target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Instagram
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                <a href="https://linkedin.com/company/apyx" target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                  <Briefcase className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

      </div>

      {/* 3D Dashboard Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl mt-20 px-4 perspective-[2000px]"
      >
        <TiltCard className="relative w-full h-[300px] sm:h-[500px] lg:h-[700px] transition-transform duration-200 ease-out">
          
          {/* Main Dashboard Image */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-[40px] border border-white/10 bg-black/50 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]" style={{ transform: "translateZ(50px)" }}>
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
              alt="Platform Dashboard"
              fill
              className="object-cover opacity-80"
              priority
            />
            {/* Dashboard inner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          </div>

          {/* Floating Glass Card - Left */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] -left-[5%] md:-left-[10%] w-48 sm:w-64 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
            style={{ transform: "translateZ(100px)" }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-apyx-cyan to-apyx-purple mb-4 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold text-sm sm:text-base">Real Projects</h3>
            <p className="text-white/50 text-xs sm:text-sm mt-1">Build portfolio-ready applications.</p>
          </motion.div>

          {/* Floating Glass Card - Right */}
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] -right-[5%] md:-right-[10%] w-48 sm:w-64 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
            style={{ transform: "translateZ(120px)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 relative overflow-hidden">
                    <Image src={`https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=100&q=80&sig=${i}`} alt="User" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-xs text-white/60 font-medium">+10k Members</span>
            </div>
            <h3 className="text-white font-semibold text-sm sm:text-base">Global Network</h3>
            <p className="text-white/50 text-xs sm:text-sm mt-1">Connect with students worldwide.</p>
          </motion.div>

        </TiltCard>
      </motion.div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-30" />
    </section>
  );
}
