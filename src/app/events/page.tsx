import { Metadata } from "next";
import { EventCardGrid } from "@/components/home/event-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getEvents } from "@/app/actions/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse upcoming and past hackathons, workshops, and meetups hosted by APYX.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex flex-col min-h-screen pt-24 lg:pt-32 pb-16">
      <section className="container-wide mb-12">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight text-white">
              Events & <span className="text-gradient">Hackathons</span>
            </h1>
            <p className="text-lg sm:text-xl text-apyx-text-secondary leading-relaxed">
              Discover our upcoming workshops, hackathons, and networking sessions. Join us to learn new skills and build alongside other passionate students.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <EventCardGrid events={events || []} />
    </div>
  );
}
