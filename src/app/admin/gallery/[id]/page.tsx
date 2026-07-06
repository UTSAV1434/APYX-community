import { Metadata } from "next";
export const dynamic = "force-dynamic";
import { ArrowLeft, Trash2, AlertCircle, ImageIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteGalleryItem } from "@/app/actions/gallery";
import { UploadPhotoForm } from "./upload-form";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Manage Album | Admin",
};

export default async function AdminAlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  // Fetch album details
  const { data: album, error: albumError } = await supabase
    .from("gallery_albums")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (albumError || !album) {
    notFound();
  }

  // Fetch photos in this album
  const { data: photos, error: photosError } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("album_id", resolvedParams.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <Link href="/admin/gallery" className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Albums
        </Link>
        <h1 className="text-3xl font-bold font-heading text-white mb-2">{album.title}</h1>
        <p className="text-apyx-text-secondary">{album.description || "Manage photos for this album."}</p>
      </div>

      <UploadPhotoForm albumId={album.id} />

      {photosError && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">Failed to load photos: {photosError.message}</p>
        </div>
      )}

      {!photos || photos.length === 0 ? (
        <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-12 text-center">
          <ImageIcon className="w-12 h-12 text-apyx-text-muted mx-auto mb-4 opacity-20" />
          <p className="text-apyx-text-secondary text-lg">No photos in this album yet. Upload one above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative bg-apyx-surface border border-apyx-border rounded-xl overflow-hidden aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={photo.url} 
                alt={photo.caption || "Gallery image"} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay with info and actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                {photo.caption && <p className="text-white text-sm font-medium truncate mb-2">{photo.caption}</p>}
                <div className="flex justify-end">
                  <form action={async () => {
                    "use server";
                    await deleteGalleryItem(photo.id, photo.url, album.id);
                  }}>
                    <button type="submit" className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-md transition-colors backdrop-blur-sm" title="Delete Photo">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
