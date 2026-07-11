import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import type { GalleryAlbum } from "@/types/database";

export type AlbumWithItemCount = GalleryAlbum & {
  gallery_items: { count: number };
};

interface AlbumCardProps {
  album: AlbumWithItemCount;
}

function getPhotoCount(album: AlbumWithItemCount): number {
  return album.gallery_items?.count ?? 0;
}

import { motion } from "framer-motion";
import { cardMotion } from "@/lib/motion";
import { Card, CardContent } from "./card";

export function AlbumCard({ album }: AlbumCardProps) {
  const photoCount = getPhotoCount(album);

  return (
    <motion.div {...cardMotion} className="h-full flex flex-col">
      <Link href={`/gallery/${album.id}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-[20px]">
        <Card variant="glass" className="h-full group p-0 overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden bg-apyx-bg shrink-0">
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
            
            <div className="absolute inset-0 bg-gradient-to-t from-apyx-surface to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 shadow-lg">
              {photoCount} Photos
            </div>
          </div>
          
          <CardContent className="pt-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-apyx-cyan transition-colors">{album.title}</h3>
            <p className="text-sm text-apyx-text-secondary line-clamp-2">{album.description || "View photos from this event."}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
