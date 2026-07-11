import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { createClient } from "@/lib/supabase/server";
import { Folder } from "lucide-react";
import { AlbumCard } from "@/components/ui/album-card";

export const metadata: Metadata = {
  title: "Gallery Albums",
  description: "Browse photos and memories from past APYX events, hackathons, and workshops.",
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: albums } = await supabase
    .from("gallery_albums")
    .select("*, gallery_items(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col min-h-screen pt-24 lg:pt-32 pb-16">
      <section className="container-wide mb-12">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight text-white">
              Event <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-lg sm:text-xl text-apyx-text-secondary leading-relaxed">
              A visual journey through our past events, hackathons, and community gatherings.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <div className="container-wide">
        {!albums || albums.length === 0 ? (
          <div className="bg-apyx-surface/50 border border-apyx-border rounded-3xl p-12 text-center">
            <Folder className="w-12 h-12 text-apyx-text-muted mx-auto mb-4" />
            <p className="text-apyx-text-secondary text-lg">No albums have been published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album, index) => (
              <ScrollReveal key={album.id} delay={index * 0.1}>
                <AlbumCard album={album} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
