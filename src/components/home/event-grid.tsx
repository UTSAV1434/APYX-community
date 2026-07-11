"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/ui/event-card";
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
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              href={`/events/${event.slug}`}
              image={event.cover_image || ""}
              title={event.title}
              description={event.description}
              category={event.type}
              status={event.status === "ongoing" ? "live" : event.status as any}
              featured={event.is_featured}
              date={new Date(event.start_date).toLocaleDateString()}
              location={event.location}
            />
          ))}
        </div>
      )}
    </section>
  );
}
