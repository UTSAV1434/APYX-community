"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/database";

interface EventGridProps {
  events: Event[];
}

export function EventCardGrid({ events = [] }: EventGridProps) {
  return (
    <section className="container-wide py-24">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
          Events <span className="text-gradient">Directory</span>
        </h2>
        
        <div className="hidden sm:flex gap-2">
          <Button variant="outline" className="bg-apyx-surface border-apyx-border text-white hover:bg-white/5">
            Upcoming
          </Button>
          <Button variant="outline" className="bg-transparent border-transparent text-apyx-text-secondary hover:text-white">
            Past
          </Button>
        </div>
      </div>

      {!events || events.length === 0 ? (
        <div className="text-center py-24 bg-apyx-surface border border-apyx-border rounded-3xl">
          <p className="text-apyx-text-secondary text-lg">No events scheduled yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-apyx-surface border border-apyx-border rounded-3xl p-6 sm:p-8 hover:border-apyx-purple/50 transition-colors flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-apyx-purple/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-apyx-purple/20 transition-colors" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    event.status === 'upcoming'
                      ? 'bg-apyx-cyan/10 border-apyx-cyan/20 text-apyx-cyan'
                      : 'bg-white/5 border-white/10 text-apyx-text-secondary'
                  }`}>
                    {event.status}
                  </span>
                  <span className="text-sm font-medium text-apyx-text-muted capitalize">
                    {event.type}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-heading text-white mb-4 group-hover:text-apyx-cyan transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-apyx-text-secondary mb-8 line-clamp-2 flex-grow">
                  {event.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-apyx-border mt-auto">
                  <div className="flex items-center gap-4 text-sm text-apyx-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.start_date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {event.location || "Campus"}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center text-sm font-bold text-apyx-purple hover:text-apyx-cyan transition-colors"
                  >
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
