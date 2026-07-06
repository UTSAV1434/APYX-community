import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Album View",
};

export default async function AlbumViewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: album } = await supabase
    .from("gallery_albums")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!album) {
    notFound();
  }

  const { data: photos } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("album_id", album.id)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col min-h-screen pt-24 lg:pt-32 pb-16">
      <section className="container-wide mb-8">
        <ScrollReveal>
          <div className="mb-6">
            <Link href="/gallery" className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-apyx-purple transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Albums
            </Link>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight text-white">
              {album.title}
            </h1>
            {album.description && (
              <p className="text-lg sm:text-xl text-apyx-text-secondary leading-relaxed">
                {album.description}
              </p>
            )}
          </div>
        </ScrollReveal>
      </section>

      <div className="container-wide">
        <div className="bg-apyx-surface/50 border border-apyx-border rounded-3xl p-4 sm:p-8">
          <GalleryPreview photos={photos || undefined} hideHeader={true} />
        </div>
      </div>
    </div>
  );
}
