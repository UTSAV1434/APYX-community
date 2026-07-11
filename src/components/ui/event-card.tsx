"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react";

import { Surface } from "@/components/ui/surface";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────────────────────────────────
// COMPOUND COMPONENTS
// ────────────────────────────────────────────────────────────────────────────

interface EventCardRootProps extends Omit<React.ComponentPropsWithoutRef<typeof Surface>, "href"> {
  href?: string;
  interactive?: boolean;
  disabled?: boolean;
}

const EventCardRoot = React.forwardRef<HTMLDivElement, EventCardRootProps>(
  ({ className, href, interactive = true, disabled, children, ...props }, ref) => {
    const isInteractive = interactive && !disabled;
    const Wrapper = href && !disabled ? Link : "div";

    const content = (
      <Surface
        ref={ref as any}
        variant="elevated"
        radius="2xl"
        className={cn(
          "group flex flex-col overflow-hidden h-full",
          isInteractive && "hover:-translate-y-1 hover:shadow-floating transition-all duration-300 cursor-pointer",
          disabled && "opacity-60 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </Surface>
    );

    if (href && !disabled) {
      return (
        <Link href={href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-2xl">
          {content}
        </Link>
      );
    }
    return content;
  }
);
EventCardRoot.displayName = "EventCardRoot";

interface EventCardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  category?: string;
  status?: "upcoming" | "live" | "sold-out" | "past" | "cancelled";
  featured?: boolean;
}

const EventCardImage = React.forwardRef<HTMLDivElement, EventCardImageProps>(
  ({ className, src, alt, category, status, featured, ...props }, ref) => {
    const statusMap = {
      upcoming: { label: "Upcoming", variant: "brand" as const },
      live: { label: "Live Now", variant: "destructive" as const },
      "sold-out": { label: "Sold Out", variant: "neutral" as const },
      past: { label: "Past Event", variant: "neutral" as const },
      cancelled: { label: "Cancelled", variant: "destructive" as const },
    };

    const currentStatus = status ? statusMap[status] : null;

    return (
      <div ref={ref} className={cn("relative w-full pt-[56.25%] overflow-hidden", className)} {...props}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-apyx-bg-alt/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Glass Hero Overlay for Badges */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10 pointer-events-none">
          <div className="flex gap-2">
            {featured && (
              <Badge variant="featured" size="sm">
                Featured
              </Badge>
            )}
            {category && (
              <Badge variant="glass" size="sm">
                {category}
              </Badge>
            )}
          </div>
          {currentStatus && (
            <Badge variant={currentStatus.variant} size="sm">
              {currentStatus.label}
            </Badge>
          )}
        </div>
      </div>
    );
  }
);
EventCardImage.displayName = "EventCardImage";

const EventCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5 flex flex-col flex-1 gap-4", className)} {...props} />
  )
);
EventCardContent.displayName = "EventCardContent";

interface EventCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

const EventCardHeader = React.forwardRef<HTMLDivElement, EventCardHeaderProps>(
  ({ className, title, description, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
      <Heading as="h3" variant="h5" lines={2} className="group-hover:text-apyx-cyan transition-colors">
        {title}
      </Heading>
      {description && (
        <Text color="secondary" variant="body-sm" lines={2}>
          {description}
        </Text>
      )}
    </div>
  )
);
EventCardHeader.displayName = "EventCardHeader";

interface EventCardDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: string;
  time?: string;
  location?: string;
  mode?: "virtual" | "in-person" | "hybrid";
  organizer?: string;
  attendees?: number;
}

const EventCardDetails = React.forwardRef<HTMLDivElement, EventCardDetailsProps>(
  ({ className, date, time, location, mode, organizer, attendees, ...props }, ref) => (
    <div ref={ref} className={cn("grid grid-cols-2 gap-y-2.5 gap-x-4", className)} {...props}>
      {date && (
        <div className="flex items-center gap-2 text-apyx-text-muted">
          <Calendar className="w-4 h-4 shrink-0" />
          <Text variant="body-sm" color="inherit" truncate>{date}</Text>
        </div>
      )}
      {time && (
        <div className="flex items-center gap-2 text-apyx-text-muted">
          <Clock className="w-4 h-4 shrink-0" />
          <Text variant="body-sm" color="inherit" truncate>{time}</Text>
        </div>
      )}
      {location && (
        <div className="flex items-center gap-2 text-apyx-text-muted">
          <MapPin className="w-4 h-4 shrink-0" />
          <Text variant="body-sm" color="inherit" truncate>{location}</Text>
        </div>
      )}
      {mode && (
        <div className="flex items-center gap-2 text-apyx-text-muted">
          <Video className="w-4 h-4 shrink-0" />
          <Text variant="body-sm" color="inherit" truncate className="capitalize">{mode}</Text>
        </div>
      )}
      {organizer && (
        <div className="flex items-center gap-2 text-apyx-text-muted">
          <Users className="w-4 h-4 shrink-0" />
          <Text variant="body-sm" color="inherit" truncate>{organizer}</Text>
        </div>
      )}
      {attendees !== undefined && (
        <div className="flex items-center gap-2 text-apyx-text-muted">
          <Users className="w-4 h-4 shrink-0" />
          <Text variant="body-sm" color="inherit" truncate>{attendees} attending</Text>
        </div>
      )}
    </div>
  )
);
EventCardDetails.displayName = "EventCardDetails";

interface EventCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  price?: string;
  tags?: string[];
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
}

const EventCardFooter = React.forwardRef<HTMLDivElement, EventCardFooterProps>(
  ({ className, price, tags, primaryAction, secondaryAction, ...props }, ref) => (
    <div ref={ref} className={cn("mt-auto pt-4 border-t border-apyx-border flex flex-col gap-4", className)} {...props}>
      {(price || (tags && tags.length > 0)) && (
        <div className="flex justify-between items-center gap-2">
          {price && (
            <Text weight="semibold" color="primary">
              {price === "0" || price.toLowerCase() === "free" ? "Free" : price}
            </Text>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-end">
              {tags.slice(0, 2).map((tag, i) => (
                <Badge key={i} variant="outline" size="xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" size="xs">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      )}
      {(primaryAction || secondaryAction) && (
        <div className="flex gap-2 w-full">
          {secondaryAction && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                secondaryAction.onClick?.();
              }}
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                primaryAction.onClick?.();
              }}
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
);
EventCardFooter.displayName = "EventCardFooter";

// ────────────────────────────────────────────────────────────────────────────
// MONOLITHIC EXPORT
// ────────────────────────────────────────────────────────────────────────────

export interface EventCardProps extends EventCardRootProps {
  image: string;
  title: string;
  description?: string;
  category?: string;
  status?: "upcoming" | "live" | "sold-out" | "past" | "cancelled";
  featured?: boolean;
  date?: string;
  time?: string;
  location?: string;
  mode?: "virtual" | "in-person" | "hybrid";
  organizer?: string;
  attendees?: number;
  price?: string;
  tags?: string[];
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  loading?: boolean;
}

export function EventCard({
  image,
  title,
  description,
  category,
  status,
  featured,
  date,
  time,
  location,
  mode,
  organizer,
  attendees,
  price,
  tags,
  primaryAction,
  secondaryAction,
  loading,
  ...props
}: EventCardProps) {
  if (loading) {
    return <EventCardSkeleton />;
  }

  return (
    <EventCardRoot {...props}>
      <EventCardImage src={image} alt={title} category={category} status={status} featured={featured} />
      <EventCardContent>
        <EventCardHeader title={title} description={description} />
        {(date || time || location || mode || organizer || attendees !== undefined) && (
          <EventCardDetails
            date={date}
            time={time}
            location={location}
            mode={mode}
            organizer={organizer}
            attendees={attendees}
          />
        )}
        {(price || tags || primaryAction || secondaryAction) && (
          <EventCardFooter
            price={price}
            tags={tags}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
          />
        )}
      </EventCardContent>
    </EventCardRoot>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SKELETON
// ────────────────────────────────────────────────────────────────────────────

export function EventCardSkeleton() {
  return (
    <Surface variant="elevated" radius="2xl" className="flex flex-col h-full overflow-hidden">
      <Skeleton className="w-full pt-[56.25%] rounded-none" />
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="mt-auto pt-4 border-t border-apyx-border flex flex-col gap-4">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </Surface>
  );
}

EventCard.Root = EventCardRoot;
EventCard.Image = EventCardImage;
EventCard.Content = EventCardContent;
EventCard.Header = EventCardHeader;
EventCard.Details = EventCardDetails;
EventCard.Footer = EventCardFooter;
EventCard.Skeleton = EventCardSkeleton;
