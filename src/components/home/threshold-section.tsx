"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { Container } from "@/components/ui/container";
import { CinematicBackground } from "@/components/home/cinematic-background";

export function ThresholdSection() {
  const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] border-t border-white/[0.05]"
    >
      {/* Layer 1: Cinematic video background (z-0) */}
      <CinematicBackground
        src="/hero-video.mp4"
        poster="/hero-poster.jpg"
        overlayOpacity={0.75}
        variant="centered"
        className="z-0"
      />

      {/* Layer 2: Subtle APYX brand accent glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-apyx-brand/5 via-apyx-purple/2 to-transparent rounded-[100%] blur-[100px]" />
      </div>

      <Container className="relative z-20 flex flex-col items-center text-center max-w-4xl py-32 lg:py-48">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...transition, delay: 0.1 }}
        >
          <Heading as="h2" className="text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-tight font-medium text-white mb-8">
            Ready to build?
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...transition, delay: 0.3 }}
        >
          <Text className="text-xl sm:text-2xl text-apyx-text-secondary leading-relaxed max-w-2xl mx-auto font-light mb-12">
            Join the network of exceptional student founders and engineers shaping the future of technology.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...transition, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
        >
          <Button 
            size="lg" 
            className="group relative h-14 px-8 text-base font-medium text-[#0a0a0a] bg-white hover:bg-white/90 border-0 rounded-full transition-all duration-300 w-full sm:w-auto overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Join APYX
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[200%] group-hover:animate-shimmer" />
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="h-14 px-8 text-base font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 w-full sm:w-auto"
          >
            Explore Events
          </Button>
        </motion.div>
        
      </Container>
    </section>
  );
}
