"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Globe, MessageCircle, Sparkles } from "lucide-react";
import { Container, Section, Grid } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassPanel } from "@/components/ui/glass-panel";

// We'll use dynamic data from props instead of this dummy data

function BuilderCard({ builder, featured = false }: { builder: any, featured?: boolean }) {
  return (
    <GlassPanel 
      className={`group relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/5 ${featured ? 'p-8 lg:p-10' : 'p-6'}`}
    >
      <div className={`flex ${featured ? 'flex-col md:flex-row gap-8 items-center' : 'flex-col gap-5'} h-full`}>
        {/* Profile Image */}
        <div className={`relative rounded-2xl overflow-hidden shrink-0 ${featured ? 'w-48 h-48 md:w-56 md:h-56' : 'w-full aspect-square max-w-[240px] mx-auto'}`}>
          <Image
            src={builder.image}
            alt={builder.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 ${featured ? '' : 'items-center text-center'}`}>
          {featured && (
            <Badge variant="glass" className="mb-4 w-fit bg-apyx-brand/10 text-apyx-brand border-apyx-brand/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured Builder
            </Badge>
          )}
          
          <Heading as={featured ? "h3" : "h4"} className={`text-white font-medium ${featured ? 'text-3xl mb-2' : 'text-xl mb-1'}`}>
            {builder.name}
          </Heading>
          
          <Text className={`text-apyx-brand ${featured ? 'text-lg mb-4' : 'text-sm mb-3'}`}>
            {builder.role}
          </Text>
          
          <Text className={`text-apyx-text-secondary line-clamp-3 ${featured ? 'text-lg max-w-lg mb-6' : 'text-sm mb-6'}`}>
            {builder.description}
          </Text>

          {/* Socials */}
          <div className={`flex items-center gap-3 mt-auto ${featured ? '' : 'justify-center'}`}>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

interface BuildersSectionProps {
  buildersData?: {
    badge_text: string;
    title: string;
    description: string;
    items?: any[];
  };
}

export function BuildersSection({ buildersData }: BuildersSectionProps) {
  const buildersList = buildersData?.items || [];
  const featuredBuilder = buildersList.find(b => b.featured) || buildersList[0];
  const gridBuilders = buildersList.filter(b => !b.featured);

  return (
    <Section padding="default" className="relative border-t border-white/[0.05] bg-apyx-background">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <ScrollReveal>
            <Badge variant="glass" size="sm" className="mb-6 font-mono text-apyx-brand border-apyx-brand/20">
              {buildersData?.badge_text || "BUILDERS"}
            </Badge>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <Heading as="h2" className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6 max-w-3xl">
              {buildersData?.title || "The talent density is the feature."}
            </Heading>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Text className="text-lg lg:text-xl text-apyx-text-secondary max-w-2xl mx-auto">
              {buildersData?.description || "Our community is composed of exceptional engineers, designers, and founders who push the boundaries of what's possible."}
            </Text>
          </ScrollReveal>
        </div>

        {/* Featured Builder */}
        {featuredBuilder && (
          <ScrollReveal delay={0.3} direction="up" className="mb-8">
            <BuilderCard builder={featuredBuilder} featured={true} />
          </ScrollReveal>
        )}

        {/* Builders Grid */}
        <Grid columns={12} gap="lg" className="mb-20">
          {gridBuilders.map((builder, idx) => (
            <div key={builder.id} className="col-span-1 sm:col-span-6 lg:col-span-3">
              <ScrollReveal delay={0.1 * idx} direction="up" className="h-full">
                <BuilderCard builder={builder} />
              </ScrollReveal>
            </div>
          ))}
        </Grid>

        {/* Community Statement */}
        <ScrollReveal delay={0.4} direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 text-apyx-text-muted">
              <span className="w-12 h-px bg-white/10" />
              <span className="text-sm tracking-widest uppercase">The Network</span>
              <span className="w-12 h-px bg-white/10" />
            </div>
            <Heading as="h3" className="text-2xl md:text-3xl font-medium text-white/90 leading-snug">
              When you join APYX, you don't just access resources—you gain a network of peers who will challenge and elevate your work.
            </Heading>
          </div>
        </ScrollReveal>

      </Container>
    </Section>
  );
}
