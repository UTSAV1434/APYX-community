"use client";

import Link from "next/link";
import { ArrowRight, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { useState } from "react";
import { GalleryItem } from "@/types/database";

interface GalleryPreviewProps {
  photos?: GalleryItem[];
  hideHeader?: boolean;
}

export function GalleryPreview({ photos, hideHeader = false }: GalleryPreviewProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Helper to create a masonry-like pattern
  const getSpans = (index: number) => {
    const pattern = index % 6;
    switch (pattern) {
      case 0: return { colSpan: 2, rowSpan: 2 }; // Big hero image
      case 3: return { colSpan: 1, rowSpan: 2 }; // Tall portrait image
      default: return { colSpan: 1, rowSpan: 1 }; // Standard square
    }
  };

  return (
    <section className={`container-wide relative z-10 ${hideHeader ? "" : "section-padding"}`}>
      {!hideHeader && (
        <SectionHeader 
          title="Memories & Moments" 
          subtitle="A glimpse into our past events, workshops, and the amazing community that makes it all happen."
          actionLabel="View Full Gallery"
          actionHref="/gallery"
        />
      )}

      {!photos || photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-apyx-text-muted bg-apyx-surface border border-apyx-border rounded-3xl">
          <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
          <p>No photos have been uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] sm:auto-rows-[200px]">
          {photos.map((item, index) => {
            const spans = getSpans(index);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                className={`group relative rounded-2xl overflow-hidden bg-apyx-surface border border-apyx-border
                  ${spans.colSpan === 2 ? 'col-span-2' : 'col-span-1'}
                  ${spans.rowSpan === 2 ? 'row-span-2' : 'row-span-1'}
                `}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.url} 
                  alt={item.caption || "Gallery photo"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-medium font-heading">{item.caption || "Untitled"}</h4>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedPhoto(item)}
                  className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                  aria-label="View photo full size"
                />
              </motion.div>
            );
          })}
        </div>
      )}

      {!hideHeader && (
        <div className="mt-8 text-center sm:hidden">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-medium text-apyx-purple hover:text-apyx-cyan transition-colors">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative inline-block max-w-[95vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || "Full size photo"}
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
              />
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              {selectedPhoto.caption && (
                <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                  <span className="inline-block px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/10">
                    {selectedPhoto.caption}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
