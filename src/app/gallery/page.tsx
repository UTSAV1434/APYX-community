import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Folder, Image as ImageIcon } from "lucide-react";

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
                <Link href={`/gallery/${album.id}`} className="group flex flex-col bg-apyx-surface border border-apyx-border rounded-2xl overflow-hidden hover:border-apyx-purple/50 transition-colors">
                  <div className="relative aspect-[4/3] overflow-hidden bg-apyx-bg">
                    {album.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={album.cover_image} 
                        alt={album.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-apyx-text-muted">
                        <ImageIcon className="w-10 h-10 opacity-20" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 shadow-lg">
                      {/* @ts-ignore */}
                      {album.gallery_items?.[0]?.count || 0} Photos
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-apyx-purple transition-colors">{album.title}</h3>
                    <p className="text-sm text-apyx-text-secondary line-clamp-2">{album.description || "View photos from this event."}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
