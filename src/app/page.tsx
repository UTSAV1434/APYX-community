import { HeroSection } from "@/components/home/hero-section";
import { FeaturedEvent } from "@/components/home/featured-event";
import { ActivityFeed } from "@/components/home/activity-feed";
import { AnnouncementsPreview } from "@/components/home/announcements-preview";
import { EventCardGrid } from "@/components/home/event-grid";
import { ImpactSection } from "@/components/home/impact-section";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { JoinCTA } from "@/components/home/join-cta";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: galleryPhotos } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(3);
  const { data: featuredEvent } = await supabase
    .from("events")
    .select("*")
    .eq("is_featured", true)
    .single();

  const { data: eventsData } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })
    .limit(3);

  const events = eventsData ? eventsData.map(e => ({
    ...e,
    start_date: e.date,
    cover_image: e.banner_url
  })) : [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section (Includes Interactive Bg) */}
      <HeroSection />

      {/* 2. Featured Event */}
      <div className="-mt-32 pt-32">
        <FeaturedEvent event={featuredEvent || undefined} />
      </div>

      {/* 3. Live Dashboard (Activity + Announcements) */}
      <section className="section-padding container-wide relative z-10">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 min-h-[500px]">
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
          <div className="lg:col-span-2">
            <AnnouncementsPreview announcements={announcements || []} />
          </div>
        </div>
      </section>

      {/* 4. Event Grid (Upcoming + Past) */}
      <EventCardGrid events={events || []} />

      {/* 5. Community Impact */}
      <ImpactSection />

      {/* 6. Gallery Preview */}
      <GalleryPreview photos={galleryPhotos || undefined} />

      {/* 7. Join CTA */}
      <JoinCTA />
    </div>
  );
}
