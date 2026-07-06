import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getEventBySlug } from "@/app/actions/events";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Event Details",
};

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const event = await getEventBySlug(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  const isHackathon = event.type.toLowerCase() === "hackathon";

  return (
    <div className="flex flex-col min-h-screen pt-24 lg:pt-32 pb-16">
      <div className="container-wide mb-8">
        <Link href="/events" className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
        </Link>
      </div>

      <section className="container-wide grid lg:grid-cols-3 gap-12 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-apyx-purple/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Main Content */}
        <div className="lg:col-span-2 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apyx-cyan/10 border border-apyx-cyan/20 text-apyx-cyan text-xs font-bold uppercase tracking-wider mb-6">
              {event.type}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
              {event.title}
            </h1>
            
            {event.cover_image ? (
              <div className="aspect-video w-full rounded-3xl overflow-hidden mb-12 border border-apyx-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event.cover_image} alt={event.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-video w-full rounded-3xl bg-apyx-surface border border-apyx-border mb-12 overflow-hidden flex items-center justify-center">
                 <span className="text-apyx-text-muted font-mono">No Banner Provided</span>
              </div>
            )}

            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4 font-heading">About the Event</h2>
              <p className="text-apyx-text-secondary mb-6 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
              
              {isHackathon && (
                <>
                  <h3 className="text-xl font-bold text-white mb-4 font-heading">What to expect:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-apyx-text-secondary mb-8">
                    <li>Mentorship from industry engineers</li>
                    <li>Exclusive API access and credits</li>
                    <li>Free food, swags, and energy drinks</li>
                    <li>Workshops on Web3, AI, and full-stack development</li>
                  </ul>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Sidebar Info */}
        <div className="relative z-10 space-y-6">
          <ScrollReveal delay={0.1}>
            <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-6 sm:p-8 sticky top-32">
              <h3 className="text-lg font-bold text-white mb-6 font-heading border-b border-apyx-border pb-4">Event Details</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-apyx-bg flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-apyx-purple" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{new Date(event.start_date).toLocaleDateString()}</p>
                    <p className="text-sm text-apyx-text-muted">{new Date(event.start_date).toLocaleTimeString()} - {new Date(event.end_date).toLocaleTimeString()}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-apyx-bg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-apyx-emerald" />
                  </div>
                  <div>
                     <p className="font-medium text-white">{event.location || "TBD"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-apyx-bg flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-apyx-cyan" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{event.registration_count || 0} Registered</p>
                    {event.registration_cap && <p className="text-sm text-apyx-text-muted">Cap: {event.registration_cap}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {event.devfolio_url ? (
                  <Button render={<a href={event.devfolio_url} target="_blank" rel="noreferrer" />} className="w-full bg-[#3770FF] hover:bg-[#3770FF]/90 text-white font-semibold h-12 shadow-lg shadow-blue-500/25 border-0">
                    Register on Devfolio
                  </Button>
                ) : (
                  <Button disabled className="w-full bg-apyx-bg border border-apyx-border text-apyx-text-muted font-semibold h-12">
                    Registration Closed
                  </Button>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
