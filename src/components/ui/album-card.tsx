"use client";

import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import type { GalleryAlbum } from "@/types/database";

export type AlbumWithItemCount = GalleryAlbum & {
  gallery_items: { count: number };
};

interface AlbumCardProps {
  album: AlbumWithItemCount;
}

function getPhotoCount(album: any): number {
  if (Array.isArray(album.gallery_items)) {
    return album.gallery_items[0]?.count ?? 0;
  }
  return album.gallery_items?.count ?? 0;
}


import { Card, CardContent } from "./card";

export function AlbumCard({ album }: AlbumCardProps) {
  const photoCount = getPhotoCount(album);

  return (
    <div className="w-full h-full flex flex-col">
      <Link href={`/gallery/${album.id}`} className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-[20px]">
        <Card variant="glass" className="w-full h-full group p-0 overflow-hidden cursor-pointer">
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-apyx-bg shrink-0">
            {album.cover_image ? (
              <Image 
                src={album.cover_image} 
                alt={album.title} 
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
    </div>
  );
}
