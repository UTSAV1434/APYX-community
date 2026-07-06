"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  image: string;
  alt: string;
  className?: string;
  rotation?: number;
  delay?: number;
}

export function FloatingElement({
  image,
  alt,
  className,
  rotation = 0,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8 }}
      className={cn("absolute hidden lg:block z-20 cursor-grab active:cursor-grabbing", className)}
      drag
      dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
    >
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [rotation, rotation + 3, rotation - 2, rotation]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay % 2 
        }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        className="relative group p-2.5 bg-[#f8f9fa] rounded-sm shadow-2xl transition-transform border border-gray-300"
      >
        {/* Tape effect on top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-white/70 backdrop-blur-sm shadow-sm rotate-2 z-10 border border-gray-200" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)", backgroundSize: "100% 4px" }} />
        
        <div className="relative overflow-hidden w-40 h-32 lg:w-48 lg:h-40 bg-gray-200">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 160px, 192px"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
