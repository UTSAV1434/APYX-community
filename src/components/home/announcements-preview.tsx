"use client";

import Link from "next/link";
import { ArrowUpRight, Megaphone, Calendar } from "lucide-react";
import { format } from "date-fns";
import { StaggeredReveal } from "@/components/ui/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Announcement } from "@/types/database";

const categoryColors: Record<string, string> = {
  event_launch: "bg-apyx-emerald/10 text-apyx-emerald border-apyx-emerald/30",
  partnership: "bg-apyx-blue/10 text-apyx-blue border-apyx-blue/30",
  update: "bg-apyx-purple/10 text-apyx-purple border-apyx-purple/30",
  speaker: "bg-apyx-amber/10 text-apyx-amber border-apyx-amber/30",
  registration: "bg-apyx-cyan/10 text-apyx-cyan border-apyx-cyan/30",
  results: "bg-apyx-rose/10 text-apyx-rose border-apyx-rose/30",
};

interface AnnouncementsPreviewProps {
  announcements: Announcement[];
}

export function AnnouncementsPreview({ announcements = [] }: AnnouncementsPreviewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-apyx-purple" />
          Latest Updates
        </h3>
        <Link 
          href="/announcements" 
          className="text-sm font-medium text-apyx-text-muted hover:text-white transition-colors"
        >
          View all
        </Link>
      </div>

      {!announcements || announcements.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 border border-apyx-border bg-apyx-bg rounded-xl">
           <p className="text-apyx-text-muted text-sm text-center">No announcements published yet.</p>
        </div>
      ) : (
        <StaggeredReveal className="space-y-4 flex-1">
          {announcements.map((announcement) => (
            <Link 
              key={announcement.id} 
              href={`/announcements/${announcement.slug}`}
              className="group block p-5 rounded-xl border border-apyx-border bg-apyx-bg hover:bg-apyx-surface hover:border-apyx-purple/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-apyx-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className={`${categoryColors[announcement.category] || categoryColors.update} text-xs py-0 h-5`}>
                    {announcement.category.replace("_", " ")}
                  </Badge>
                  {announcement.is_pinned && (
                    <Badge variant="outline" className="bg-apyx-rose/10 text-apyx-rose border-apyx-rose/30 text-xs py-0 h-5">
                      Pinned
                    </Badge>
                  )}
                  <div className="flex-1" />
                  <time className="text-xs text-apyx-text-muted flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(announcement.published_at), "MMM d")}
                  </time>
                </div>
                
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-base font-semibold text-white group-hover:text-apyx-cyan transition-colors line-clamp-2">
                    {announcement.title}
                  </h4>
                  <ArrowUpRight className="w-4 h-4 text-apyx-text-muted group-hover:text-apyx-cyan shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </StaggeredReveal>
      )}
    </div>
  );
}
