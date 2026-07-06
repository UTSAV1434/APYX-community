"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Timer } from "lucide-react";
import { format, differenceInSeconds } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { Event } from "@/types/database";

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diffInSeconds = differenceInSeconds(target, now);

      if (diffInSeconds <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const days = Math.floor(diffInSeconds / (3600 * 24));
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = Math.floor(diffInSeconds % 60);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="flex items-center gap-4 mt-6 p-4 rounded-xl glass border-apyx-border">
      <div className="flex items-center gap-2 text-apyx-text-muted">
        <Timer className="w-4 h-4 text-apyx-cyan" />
        <span className="text-xs uppercase tracking-wider font-semibold">Starts In</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-lg font-medium text-white">
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.days).padStart(2, "0")}</span>
          <span className="text-[10px] text-apyx-text-muted">DAYS</span>
        </div>
        <span className="text-apyx-border">:</span>
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="text-[10px] text-apyx-text-muted">HRS</span>
        </div>
        <span className="text-apyx-border">:</span>
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="text-[10px] text-apyx-text-muted">MIN</span>
        </div>
        <span className="text-apyx-border">:</span>
        <div className="flex flex-col items-center text-apyx-cyan">
          <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="text-[10px] text-apyx-text-muted">SEC</span>
        </div>
      </div>
    </div>
  );
}

export function FeaturedEvent({ event }: { event?: Event }) {
  if (!event) return null;

  const progress = event.registration_count && event.registration_cap
    ? (event.registration_count / event.registration_cap) * 100
    : 0;

  return (
    <section className="section-padding container-wide relative z-10">
      <SectionHeader 
        title="Featured Event" 
        subtitle="Don't miss our flagship hackathon of the year."
        actionLabel="View All Events"
        actionHref="/events"
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative group rounded-2xl overflow-hidden border border-apyx-border bg-apyx-surface"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-apyx-purple/10 to-apyx-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 p-6 sm:p-8 lg:p-10 relative z-10">
          
          {/* Left info */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className="border-apyx-purple text-apyx-purple bg-apyx-purple/10">
                  {event.type.toUpperCase()}
                </Badge>
                {event.themes && event.themes.map((theme: any) => (
                  <Badge key={theme.name} variant="outline" className={theme.color || "text-apyx-blue border-apyx-blue/30 bg-apyx-blue/10"}>
                    {theme.name}
                  </Badge>
                ))}
              </div>

              <Link href={`/events/${event.slug}`} className="group-hover:text-apyx-cyan transition-colors">
                <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-3">
                  {event.title}
                </h3>
              </Link>
              
              <p className="text-apyx-text-secondary text-base sm:text-lg max-w-xl mb-6">
                {event.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-apyx-text-secondary mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-apyx-purple" />
                  <span>{format(new Date(event.start_date), "MMMM do, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-apyx-blue" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <CountdownTimer targetDate={event.start_date} />
          </div>

          {/* Right actions & progress */}
          <div className="lg:col-span-2 flex flex-col justify-center border-t md:border-t-0 md:border-l border-apyx-border pt-6 md:pt-0 md:pl-6 lg:pl-10">
            
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Users className="w-4 h-4 text-apyx-cyan" />
                  <span>{event.registration_count || 0} Registered</span>
                </div>
                {event.registration_cap && (
                  <span className="text-sm text-apyx-text-muted">/ {event.registration_cap} spots</span>
                )}
              </div>
              {/* Progress bar */}
              <div className="h-2 w-full bg-apyx-bg rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-apyx-purple via-apyx-blue to-apyx-cyan"
                />
              </div>
              {progress > 80 && (
                <p className="mt-2 text-xs text-apyx-text-muted">
                  Registration closing soon. Secure your spot!
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Button render={<Link href={`/events/${event.slug}`} />} size="lg" className="w-full bg-white text-black hover:bg-gray-200">
                Register Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button render={<Link href={`/events/${event.slug}`} />} variant="outline" size="lg" className="w-full border-apyx-border text-white hover:bg-white/5">
                View Details
              </Button>
            </div>
            
          </div>
        </div>
      </motion.div>
    </section>
  );
}
