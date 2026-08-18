"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section, Grid } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RadialGlow } from "@/components/ui/experience/backgrounds";

// We'll use dynamic data from props instead of this dummy data

interface ArtifactsSectionProps {
  artifactsData?: {
    badge_text: string;
    title: string;
    description: string;
    items: any[];
  };
}

export function ArtifactCard({ artifact, featured = false, delay = 0 }: { artifact: any, featured?: boolean, delay?: number }) {
  if (featured) {
    return (
      <ScrollReveal direction="up" delay={delay} className="h-full">
        <Link href={artifact.link || "#"} target="_blank" rel="noopener noreferrer" className="block h-full group">
          <Card variant="glass" className="h-full flex flex-col group overflow-hidden border-white/10 hover:border-apyx-cyan/30 transition-all duration-500">
            <RadialGlow />
            <div className="relative aspect-video lg:aspect-[16/10] overflow-hidden rounded-t-[20px] bg-apyx-surface">
              {/* Subtle Image Zoom on Hover */}
              <Image 
                src={artifact.image}
                alt={artifact.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                <div className="flex gap-2 mb-4">
                  {artifact.tags.map((tag: string) => (
                    <Badge key={tag} variant="neutral" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-transparent text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-3xl font-semibold text-white mb-3 font-heading tracking-tight group-hover:text-apyx-cyan transition-colors">
                  {artifact.title}
                </h3>
                <p className="text-apyx-text-secondary max-w-lg leading-relaxed">
                  {artifact.description}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal direction="up" delay={delay} className="flex-1">
      <Link href={artifact.link || "#"} target="_blank" rel="noopener noreferrer" className="block h-full group">
        <Card variant="glass" className="h-full flex flex-col group overflow-hidden border-white/10 hover:border-apyx-purple/30 transition-all duration-500">
          <RadialGlow />
          <div className="relative h-48 sm:h-56 lg:h-48 overflow-hidden rounded-t-[20px] bg-apyx-surface">
            <Image 
              src={artifact.image}
              alt={artifact.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          </div>
          <CardContent className="p-6 flex-1 flex flex-col justify-between bg-black/40 backdrop-blur-md relative z-10 -mt-10 rounded-b-[20px]">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl font-semibold text-white font-heading group-hover:text-apyx-purple transition-colors">{artifact.title}</h4>
                <span className="text-xs font-mono text-apyx-purple border border-apyx-purple/20 bg-apyx-purple/5 px-2 py-1 rounded-md">
                  {artifact.category}
                </span>
              </div>
              <p className="text-sm text-apyx-text-secondary leading-relaxed mb-4">
                {artifact.description}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                {artifact.tags.slice(0, 2).map((tag: string) => (
                  <Badge key={tag} variant="neutral" className="bg-white/5 text-white/70 border-transparent text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-apyx-purple transition-colors group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </ScrollReveal>
  );
}

export function ArtifactsSection({ artifactsData }: ArtifactsSectionProps) {
  const artifactsList = artifactsData?.items || [];
  const featuredArtifact = artifactsList.find(a => a.featured) || artifactsList[0];
  const secondaryArtifacts = artifactsList.filter(a => !a.featured);

  return (
    <Section padding="default" className="relative border-t border-white/[0.05] overflow-hidden bg-transparent">
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <ScrollReveal>
              <Badge variant="glass" size="sm" className="mb-6 font-mono text-apyx-cyan border-apyx-cyan/20 bg-apyx-cyan/5">
                {artifactsData?.badge_text || "SHOWCASE"}
              </Badge>
              <Heading as="h2" className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
                {artifactsData?.title || "Proof of Work."}
              </Heading>
              <Text className="text-lg lg:text-xl text-apyx-text-secondary leading-relaxed">
                {artifactsData?.description || "The APYX ecosystem produces production-grade infrastructure, applied AI research, and venture-backed startups. Here is what we've shipped."}
              </Text>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2} direction="left">
            <Button variant="outline" className="hidden lg:inline-flex rounded-full px-6 text-white border-white/20 hover:bg-white/10 group">
              View All Artifacts
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </ScrollReveal>
        </div>

        {/* Curated Grid */}
        <Grid columns={12} gap="lg" className="mb-16">
          
          {/* Featured Large Project (Left) */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-7">
            {featuredArtifact && (
              <ArtifactCard 
                artifact={featuredArtifact} 
                featured 
                delay={0.1}
              />
            )}
          </div>

          {/* Medium Projects Stack (Right) */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {secondaryArtifacts.map((artifact: any, idx: number) => (
              <ArtifactCard 
                key={artifact.id}
                artifact={artifact}
                delay={0.2 + (idx * 0.1)}
              />
            ))}
          </div>

        </Grid>

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center lg:hidden">
          <Button variant="outline" className="rounded-full px-6 text-white border-white/20">
            View All Artifacts
          </Button>
        </div>

      </Container>
    </Section>
  );
}
