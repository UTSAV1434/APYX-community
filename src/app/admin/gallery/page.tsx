import { Metadata } from "next";
import { Plus, Trash2, AlertCircle, Folder, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteAlbum } from "@/app/actions/gallery";

export const metadata: Metadata = {
  title: "Manage Gallery | Admin",
};

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  
  // Fetch albums and the count of photos inside them
  const { data: albums, error } = await supabase
    .from("gallery_albums")
    .select("*, gallery_items(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white mb-2">Gallery Manager</h1>
          <p className="text-apyx-text-secondary">Manage photo albums for your events.</p>
        </div>
        <Link href="/admin/gallery/albums/new">
          <Button className="bg-apyx-purple hover:bg-apyx-purple/90 text-white gap-2">
            <Plus className="w-4 h-4" />
            New Album
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">Failed to load albums: {error.message}</p>
        </div>
      )}

      {!albums || albums.length === 0 ? (
        <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-12 text-center">
          <Folder className="w-12 h-12 text-apyx-text-muted mx-auto mb-4" />
          <p className="text-apyx-text-secondary text-lg">No albums found. Create a new album to start uploading photos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div key={album.id} className="group flex flex-col bg-apyx-surface border border-apyx-border rounded-2xl overflow-hidden hover:border-apyx-purple/50 transition-colors">
              <Link href={`/admin/gallery/${album.id}`} className="block relative aspect-video overflow-hidden bg-apyx-bg">
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
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
                  {album.gallery_items?.count ?? 0} Photos
                </div>
              </Link>
              
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white mb-1">{album.title}</h3>
                  <p className="text-sm text-apyx-text-muted truncate max-w-[200px]">{album.description || "No description"}</p>
                </div>
                
                <form action={async () => {
                  "use server";
                  await deleteAlbum(album.id);
                }}>
                  <button type="submit" className="p-2 text-apyx-text-muted hover:text-red-500 transition-colors bg-apyx-bg rounded-lg border border-apyx-border hover:border-red-500/50" title="Delete Album">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
