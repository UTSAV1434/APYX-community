"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Activity, Zap, CheckCircle2, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section, Grid } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/ui/event-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface EventItem {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  cover_image: string | null;
  location?: string | null;
  mode?: "virtual" | "in-person" | "hybrid";
  capacity?: number;
  registrations?: number;
  category?: string;
  status?: "draft" | "upcoming" | "live" | "sold_out" | "cancelled" | "completed" | "ongoing" | "past";
}

interface MomentumSectionProps {
  featuredEvent?: EventItem | null;
  upcomingEvents?: EventItem[];
}

const LIVE_UPDATES = [
  { id: 1, icon: <Ticket className="w-4 h-4 text-apyx-brand" />, text: "Registration opened for APYX Hackathon 2026", time: "Just now" },
  { id: 2, icon: <Zap className="w-4 h-4 text-apyx-cyan" />, text: "New workshop: Deep Learning on the Edge added", time: "2 hours ago" },
  { id: 3, icon: <CheckCircle2 className="w-4 h-4 text-green-400" />, text: "Speaker confirmed: Sam Altman", time: "5 hours ago" },
];

export function MomentumSection({ featuredEvent, upcomingEvents = [] }: MomentumSectionProps) {
  const [currentUpdate, setCurrentUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % LIVE_UPDATES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Use dummy data if no DB data is provided yet
  const dummyFeatured = {
    id: "featured-1",
    title: "APYX Annual Summit 2026",
    description: "The largest gathering of student founders and engineers. Three days of keynotes, hackathons, and networking.",
    cover_image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    start_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    location: "San Francisco, CA",
    mode: "hybrid" as const,
    capacity: 1000,
    registrations: 850,
    category: "Summit",
    status: "upcoming" as const,
  };

  const dummyUpcoming = [
    {
      id: "up-1",
      title: "Rust for Distributed Systems",
      description: "Mastering safety and concurrency in large-scale backend systems.",
      cover_image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80",
      start_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Virtual",
      mode: "virtual" as const,
      capacity: 500,
      registrations: 490,
      category: "Workshop",
      status: "upcoming" as const,
    },
    {
      id: "up-2",
      title: "AI Agent Hackathon",
      description: "Build autonomous agents using the latest LLMs.",
      cover_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
      start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      location: "New York, NY",
      mode: "in-person" as const,
      capacity: 200,
      registrations: 50,
      category: "Hackathon",
      status: "upcoming" as const,
    }
  ];

  const displayFeatured = featuredEvent || dummyFeatured;
  const displayUpcoming = upcomingEvents.length > 0 ? upcomingEvents : dummyUpcoming;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <Section padding="default" className="relative border-t border-white/[0.05] bg-apyx-background overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <ScrollReveal>
              <Badge variant="glass" size="sm" className="mb-6 font-mono text-apyx-brand border-apyx-brand/20 bg-apyx-brand/5 flex items-center gap-2 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apyx-brand opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-apyx-brand"></span>
                </span>
                MOMENTUM
              </Badge>
              <Heading as="h2" className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
                The Ecosystem in Motion.
              </Heading>
              <Text className="text-lg lg:text-xl text-apyx-text-secondary leading-relaxed">
                What's happening right now across the APYX network. Don't miss out on what's coming next.
              </Text>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2} direction="left" className="flex-shrink-0">
            <Button variant="outline" className="hidden lg:inline-flex rounded-full px-6 text-white border-white/20 hover:bg-white/10 group">
              View Calendar
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </ScrollReveal>
        </div>

        {/* Live Updates Strip */}
        <ScrollReveal delay={0.1} direction="up" className="mb-12">
          <div className="flex items-center gap-4 bg-apyx-surface/50 border border-white/5 rounded-full p-2 pr-6 max-w-3xl mx-auto backdrop-blur-sm relative overflow-hidden group">
            <div className="flex items-center justify-center bg-black/40 rounded-full h-10 w-10 shrink-0 border border-white/10 group-hover:border-apyx-brand/50 transition-colors duration-500">
              <Activity className="w-4 h-4 text-white/70" />
            </div>
            <div className="flex-1 relative h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentUpdate}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 truncate">
                    {LIVE_UPDATES[currentUpdate].icon}
                    <span className="text-sm text-white/90 font-medium truncate">
                      {LIVE_UPDATES[currentUpdate].text}
                    </span>
                  </div>
                  <span className="text-xs text-apyx-text-muted whitespace-nowrap shrink-0 hidden sm:block">
                    {LIVE_UPDATES[currentUpdate].time}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

        {/* Events Grid */}
        <Grid columns={12} gap="lg">
          
          {/* Featured Primary Event (Left) */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-7">
            <ScrollReveal delay={0.2} direction="up" className="h-full">
              <EventCard
                featured
                image={displayFeatured.cover_image || ""}
                title={displayFeatured.title}
                description={displayFeatured.description}
                category={displayFeatured.category}
                status={displayFeatured.status === "ongoing" ? "live" : displayFeatured.status === "past" ? "completed" : displayFeatured.status}
                datetime={formatDate(displayFeatured.start_date)}
                location={displayFeatured.location || undefined}
                mode={displayFeatured.mode}
                capacity={displayFeatured.capacity}
                registrations={displayFeatured.registrations}
                countdownTo={displayFeatured.start_date}
                primaryAction={{ label: "Register Now" }}
                secondaryAction={{ label: "Details" }}
              />
            </ScrollReveal>
          </div>

          {/* Secondary Events Stack (Right) */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-5 flex flex-col gap-6">
            {displayUpcoming.map((event, idx) => (
              <ScrollReveal 
                key={event.id} 
                delay={0.3 + (idx * 0.1)} 
                direction="up" 
                className="flex-1 min-h-[300px]"
              >
                <EventCard
                  image={event.cover_image || ""}
                  title={event.title}
                  description={event.description}
                  category={event.category}
                  status={event.status === "ongoing" ? "live" : event.status === "past" ? "completed" : event.status}
                  datetime={formatDate(event.start_date)}
                  location={event.location || undefined}
                  mode={event.mode}
                  capacity={event.capacity}
                  registrations={event.registrations}
                  primaryAction={{ label: "Register" }}
                />
              </ScrollReveal>
            ))}
          </div>
          
        </Grid>

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center lg:hidden">
          <Button variant="outline" className="rounded-full px-6 text-white border-white/20">
            View Calendar
          </Button>
        </div>

      </Container>
    </Section>
  );
}
