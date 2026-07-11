/**
 * APYX Loading Skeleton Components
 * Source: .ai/16-performance.md — "Show skeleton loaders"
 * Source: .ai/15-accessibility.md — "Skeletons should be accessible"
 *
 * Pre-composed skeleton layouts that match specific components.
 * Use these in page-level loading.tsx files and Suspense fallbacks.
 *
 * Components:
 *   CardSkeleton         — Generic content card
 *   EventCardSkeleton    — Matches EventCard layout
 *   AnnouncementSkeleton — Matches AnnouncementCard layout
 *   TeamCardSkeleton     — Matches TeamCard layout
 *   FeaturedEventSkeleton — Matches FeaturedEvent layout
 *   PageHeroSkeleton     — For page-level hero sections
 *   ActivityFeedSkeleton — Matches ActivityFeed layout
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

/* ── CardSkeleton ──────────────────────────────────────────────────── */
/** Generic content card skeleton */
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="card-skeleton"
      aria-busy="true"
      aria-label="Loading content…"
      className={cn(
        "rounded-[20px] border border-apyx-border bg-apyx-surface p-6",
        className
      )}
    >
      <SkeletonText lines={1} className="mb-4 h-5 w-1/3" />
      <SkeletonText lines={3} lastLineWidth="70%" className="mb-6" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-28 rounded-xl" />
        <Skeleton className="h-10 w-20 rounded-xl" />
      </div>
    </div>
  );
}

/* ── EventCardSkeleton ─────────────────────────────────────────────── */
/** Matches the EventCard layout */
function EventCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="event-card-skeleton"
      aria-busy="true"
      aria-label="Loading event…"
      className={cn(
        "rounded-[20px] border border-apyx-border bg-apyx-surface overflow-hidden",
        className
      )}
    >
      {/* Image area */}
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-6 space-y-3">
        {/* Badge + date */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-3.5 w-20" />
        </div>

        {/* Title */}
        <SkeletonText lines={2} lastLineWidth="80%" />

        {/* Description */}
        <SkeletonText lines={2} lastLineWidth="60%" className="text-xs" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* ── AnnouncementSkeleton ──────────────────────────────────────────── */
/** Matches the AnnouncementCard / AnnouncementsPreview list item */
function AnnouncementSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="announcement-skeleton"
      aria-busy="true"
      aria-label="Loading announcement…"
      className={cn(
        "rounded-xl border border-apyx-border bg-apyx-bg p-5",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="ml-auto h-3.5 w-12" />
      </div>
      <SkeletonText lines={2} lastLineWidth="75%" />
    </div>
  );
}

/** List of 3 announcement skeletons */
function AnnouncementsPreviewSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="announcements-preview-skeleton"
      aria-busy="true"
      aria-label="Loading announcements…"
      className={cn("space-y-4", className)}
    >
      {[1, 2, 3].map((i) => (
        <AnnouncementSkeleton key={i} />
      ))}
    </div>
  );
}

/* ── TeamCardSkeleton ──────────────────────────────────────────────── */
/** Matches the TeamCard layout */
function TeamCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="team-card-skeleton"
      aria-busy="true"
      aria-label="Loading team member…"
      className={cn(
        "rounded-[20px] border border-apyx-border bg-apyx-surface overflow-hidden",
        className
      )}
    >
      {/* Square avatar area */}
      <Skeleton className="aspect-square w-full rounded-none" />

      <div className="p-5 text-center space-y-2">
        <Skeleton className="h-5 w-32 mx-auto" />
        <Skeleton className="h-4 w-24 mx-auto" />
        <Skeleton className="h-3 w-16 mx-auto" />
        <div className="flex justify-center gap-1 pt-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-12 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── FeaturedEventSkeleton ─────────────────────────────────────────── */
/** Matches the FeaturedEvent section layout */
function FeaturedEventSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="featured-event-skeleton"
      aria-busy="true"
      aria-label="Loading featured event…"
      className={cn(
        "rounded-[20px] border border-apyx-border bg-apyx-surface p-8",
        className
      )}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-5 w-16 rounded-full" />
          <SkeletonText lines={2} lastLineWidth="85%" className="[&>div]:h-8" />
          <SkeletonText lines={3} lastLineWidth="70%" />
          {/* Countdown */}
          <div className="flex gap-4 py-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-1">
                <Skeleton className="h-10 w-12 mx-auto" />
                <Skeleton className="h-3 w-8 mx-auto" />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-[52px] w-36 rounded-2xl" />
            <Skeleton className="h-[52px] w-28 rounded-2xl" />
          </div>
        </div>
        <Skeleton className="rounded-[20px] min-h-[300px]" />
      </div>
    </div>
  );
}

/* ── PageHeroSkeleton ──────────────────────────────────────────────── */
/** For page-level loading states — replaces the page hero text */
function PageHeroSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="page-hero-skeleton"
      aria-busy="true"
      aria-label="Loading page…"
      className={cn("max-w-3xl py-8 sm:py-16 space-y-4", className)}
    >
      <Skeleton className="h-7 w-24 rounded-full" />
      <Skeleton className="h-12 w-3/4 sm:h-16" />
      <Skeleton className="h-10 w-1/2 sm:h-14" />
      <SkeletonText lines={2} lastLineWidth="80%" className="pt-2" />
    </div>
  );
}

/* ── ActivityFeedSkeleton ──────────────────────────────────────────── */
/** Matches the ActivityFeed component layout */
function ActivityFeedSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="activity-feed-skeleton"
      aria-busy="true"
      aria-label="Loading activity…"
      className={cn(
        "rounded-[20px] border border-apyx-border bg-apyx-surface p-6",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="size-2 rounded-full" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton preset="avatar" className="h-8 w-8" />
            <div className="flex-1 space-y-1.5">
              <SkeletonText lines={2} lastLineWidth="60%" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  CardSkeleton,
  EventCardSkeleton,
  AnnouncementSkeleton,
  AnnouncementsPreviewSkeleton,
  TeamCardSkeleton,
  FeaturedEventSkeleton,
  PageHeroSkeleton,
  ActivityFeedSkeleton,
};
