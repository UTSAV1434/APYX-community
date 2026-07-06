"use client";

import Image from "next/image";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function JoinCTA() {
  return (
    <section className="section-padding container-wide relative z-10">
      <ScrollReveal>
        <div className="relative rounded-3xl overflow-hidden border border-apyx-border bg-apyx-surface text-center px-4 py-16 sm:py-24">
          
          {/* Abstract glowing background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-gradient-brand opacity-10 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-apyx-bg border border-apyx-border flex items-center justify-center mb-8 shadow-xl shadow-apyx-purple/10">
              <Terminal className="w-8 h-8 text-apyx-cyan" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-6">
              Ready to <span className="text-gradient">Execute?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-12">
              Join a community of builders, hackers, and innovators. Whether you&apos;re looking to learn, build, or lead, there&apos;s a place for you at APYX.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-brand hover:opacity-90 transition-all text-white border-0 shadow-lg shadow-purple-500/25 px-8 text-base h-12"
              >
                Join the Ecosystem
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-apyx-border text-white hover:bg-white/5 hover:border-apyx-purple/50 px-8 text-base h-12"
              >
                Learn More
              </Button>
            </div>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
