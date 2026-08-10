"use client";

import { motion } from "framer-motion";
import { StatsCard } from "@/components/ui/stats-card";
import { Heading, Text } from "@/components/ui/typography";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import * as Icons from "lucide-react";

const engineeringPartners = [
  { name: "Vercel", description: "Frontend Infrastructure" },
  { name: "Supabase", description: "Backend & Database" },
  { name: "Stripe", description: "Financial Infrastructure" },
  { name: "Linear", description: "Issue Tracking" }
];

const networkOutcomes = [
  { name: "Y Combinator", description: "Alumni Funded" },
  { name: "Google", description: "Engineers Placed" },
  { name: "MIT", description: "Research Partnerships" },
  { name: "GitHub", description: "Open Source Contributions" }
];

interface FoundationSectionProps {
  foundationData?: {
    title: string;
    title_highlight: string;
    description: string;
    pillars: Array<{ icon: string; title: string; description: string }>;
  };
}

export function FoundationSection({ foundationData }: FoundationSectionProps) {
  return (
    <section className="relative z-10 bg-[#0a0a0a] border-t border-white/[0.05] pt-24 pb-32">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <ScrollReveal>
              <Heading as="h2" className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-4">
                {foundationData?.title || "Trust is shipped, not inherited."}
              </Heading>
              <Text className="text-lg text-apyx-text-secondary leading-relaxed">
                {foundationData?.description || "APYX is the engineering foundation behind top student founders, open-source contributors, and product builders. We provide the exact infrastructure necessary to build, scale, and deploy at the highest level."}
              </Text>
            </ScrollReveal>
          </div>
        </div>

        {/* The Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {foundationData?.pillars?.map((pillar, index) => {
            const Icon = (Icons as any)[pillar.icon] || Icons.Circle;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-apyx-surface border border-white/[0.05] p-8 rounded-2xl hover:border-apyx-purple/30 transition-colors">
                  <div className="w-12 h-12 bg-apyx-purple/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-apyx-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-apyx-text-secondary leading-relaxed">{pillar.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
