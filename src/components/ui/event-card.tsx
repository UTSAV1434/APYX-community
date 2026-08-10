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
import { motion } from "framer-motion";
import { cardMotion } from "@/lib/motion";

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

    return (
      <motion.div
        whileHover={isInteractive ? cardMotion.whileHover : undefined}
        whileTap={isInteractive ? cardMotion.whileTap : undefined}
        className={cn(
          "group flex flex-col overflow-hidden h-full relative h-full",
          isInteractive && "cursor-pointer",
          disabled && "opacity-60 cursor-not-allowed",
          className
        )}
      >
        <Surface
          ref={ref as any}
          variant="elevated"
          radius="2xl"
          padding="none"
          className="h-full w-full relative"
          {...props}
        >
          {children}
        </Surface>
      </motion.div>
    );
  }
);
EventCardRoot.displayName = "EventCardRoot";

interface EventCardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  category?: string;
  status?: "draft" | "upcoming" | "live" | "sold_out" | "cancelled" | "completed";
  featured?: boolean;
  countdownTo?: string | Date;
}

const EventCardImage = React.forwardRef<HTMLDivElement, EventCardImageProps>(
  ({ className, src, alt, category, status, featured, countdownTo, ...props }, ref) => {
    const statusMap = {
      draft: { label: "Draft", variant: "neutral" as const },
      upcoming: { label: "Upcoming", variant: "brand" as const },
      live: { label: "Live Now", variant: "destructive" as const },
      sold_out: { label: "Sold Out", variant: "neutral" as const },
      cancelled: { label: "Cancelled", variant: "destructive" as const },
      completed: { label: "Completed", variant: "neutral" as const },
    };

    const currentStatus = status ? statusMap[status] : null;

    return (
      <div ref={ref} className={cn("relative w-full pt-[56.25%] overflow-hidden", className)} {...props}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-apyx-surface to-apyx-background transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        )}
        {/* Premium dark gradient overlay with slight vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none mix-blend-overlay" />
        
        {/* Glass Hero Overlay for Badges */}
        <div className="absolute top-0 left-0 w-full p-5 flex justify-between items-start z-10 pointer-events-none transition-all duration-700 group-hover:drop-shadow-glow">
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
        
        {/* Bottom Overlays */}
        {countdownTo && (
          <div className="absolute bottom-5 left-5 z-10 pointer-events-none transition-transform duration-700 ease-out group-hover:-translate-y-0.5">
            <EventCardCountdown targetDate={countdownTo} />
          </div>
        )}
      </div>
    );
  }
);
EventCardImage.displayName = "EventCardImage";

export interface EventCardCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: string | Date;
}

const EventCardCountdown = React.forwardRef<HTMLDivElement, EventCardCountdownProps>(
  ({ className, targetDate, ...props }, ref) => {
    const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);
      const target = new Date(targetDate).getTime();
      
      const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = target - now;
        
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            secs: Math.floor((difference % (1000 * 60)) / 1000),
          });
        }
      };
      
      updateCountdown();
      const timer = setInterval(updateCountdown, 1000);
      return () => clearInterval(timer);
    }, [targetDate]);

    if (!isMounted) return null;

    // @ts-ignore (safeguard)
    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.mins === 0 && timeLeft.secs === 0) return null;

    const pad = (n: number) => n.toString().padStart(2, '0');

    const Tile = ({ value, label }: { value: string, label: string }) => (
      <GlassPanel variant="subtle" radius="md" className="flex flex-col items-center justify-center min-w-[50px] py-1.5 px-1.5 backdrop-blur-md bg-black/40 border-white/10 shadow-sm transition-all duration-700 ease-out group-hover:bg-black/50 group-hover:border-white/20">
        <span className="text-sm font-semibold tracking-tight text-white leading-none">{value}</span>
        <span className="text-[9px] text-white/60 font-medium tracking-wide mt-1 uppercase">{label}</span>
      </GlassPanel>
    );

    return (
      <div ref={ref} className={cn("flex gap-1.5", className)} aria-hidden="true" {...props}>
        <span className="sr-only">
          {`Event starts in ${timeLeft.days} days, ${timeLeft.hours} hours, and ${timeLeft.mins} minutes.`}
        </span>
        <Tile value={pad(timeLeft.days)} label="Days" />
        <Tile value={pad(timeLeft.hours)} label="Hours" />
        <Tile value={pad(timeLeft.mins)} label="Mins" />
        {/* @ts-ignore */}
        <Tile value={pad(timeLeft.secs)} label="Secs" />
      </div>
    );
  }
);
EventCardCountdown.displayName = "EventCardCountdown";

export interface EventCardProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  registrations: number;
  capacity: number;
}

const EventCardProgress = React.forwardRef<HTMLDivElement, EventCardProgressProps>(
  ({ className, registrations, capacity, ...props }, ref) => {
    const percentage = Math.min(Math.round((registrations / capacity) * 100), 100);
    const isAlmostFull = percentage >= 85;
    const isFull = percentage >= 100;
    const remaining = capacity - registrations;
    
    return (
      <div ref={ref} className={cn("flex flex-col gap-2.5 w-full mt-3", className)} {...props}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-apyx-text-secondary">
            <Users className="w-3.5 h-3.5" />
            <Text variant="body-xs" color="inherit" className="font-medium">
              {registrations} Registered
            </Text>
          </div>
          <Text variant="body-xs" color={isFull ? "secondary" : isAlmostFull ? "warning" : "secondary"} className="font-medium">
            {isFull ? "Sold out" : `${remaining} spots remaining`}
          </Text>
        </div>
        <div className="h-1 w-full bg-apyx-border/50 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              isFull ? "bg-apyx-text-muted/40" : isAlmostFull ? "bg-amber-500" : "bg-apyx-brand"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
EventCardProgress.displayName = "EventCardProgress";

const EventCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 flex flex-col flex-1 gap-5", className)} {...props} />
  )
);
EventCardContent.displayName = "EventCardContent";

interface EventCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  href?: string;
  datetime?: React.ReactNode;
}

const EventCardHeader = React.forwardRef<HTMLDivElement, EventCardHeaderProps>(
  ({ className, title, description, href, datetime, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
      {datetime && (
        <Text variant="body-xs" className="text-apyx-brand font-semibold uppercase tracking-wider mb-0.5">
          {datetime}
        </Text>
      )}
      <Heading as="h3" variant="h5" lines={2}>
        {href ? (
          <Link href={href} className="before:absolute before:inset-0 before:z-0 outline-none focus-visible:ring-2 focus-visible:ring-apyx-brand rounded-sm">
            {title}
          </Link>
        ) : (
          title
        )}
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
  location?: string;
  mode?: "virtual" | "in-person" | "hybrid";
  organizer?: string;
  attendees?: number;
}

const EventCardDetails = React.forwardRef<HTMLDivElement, EventCardDetailsProps>(
  ({ className, location, mode, organizer, attendees, ...props }, ref) => (
    <div ref={ref} className={cn("grid grid-cols-2 gap-x-4 gap-y-2", className)} {...props}>
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
  customAction?: React.ReactNode;
}

const EventCardFooter = React.forwardRef<HTMLDivElement, EventCardFooterProps>(
  ({ className, price, tags, primaryAction, secondaryAction, customAction, ...props }, ref) => (
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
              className="flex-1 relative z-10"
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
              className="flex-1 relative z-10 transition-all duration-700 ease-out group-hover:brightness-110 group-hover:shadow-glow-sm group-hover:-translate-y-0.5 group/btn"
              onClick={(e) => {
                e.preventDefault();
                primaryAction.onClick?.();
              }}
            >
              <span className="flex items-center justify-center gap-1.5 w-full">
                {primaryAction.label}
                <svg className="w-3.5 h-3.5 transition-transform duration-700 ease-out group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Button>
          )}
          {customAction}
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
  status?: "draft" | "upcoming" | "live" | "sold_out" | "cancelled" | "completed";
  featured?: boolean;
  datetime?: React.ReactNode;
  location?: string;
  mode?: "virtual" | "in-person" | "hybrid";
  organizer?: string;
  attendees?: number;
  price?: string;
  tags?: string[];
  capacity?: number;
  registrations?: number;
  countdownTo?: string | Date;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  customAction?: React.ReactNode;
  loading?: boolean;
}

export function EventCard({
  image,
  title,
  description,
  category,
  status,
  featured,
  datetime,
  location,
  mode,
  organizer,
  attendees,
  price,
  tags,
  capacity,
  registrations,
  countdownTo,
  primaryAction,
  secondaryAction,
  customAction,
  loading,
  ...props
}: EventCardProps & { capacity?: number; registrations?: number; countdownTo?: string | Date }) {
  if (loading) {
    return <EventCardSkeleton />;
  }

  return (
    <EventCardRoot {...props}>
      <EventCardImage 
        src={image} 
        alt={title} 
        category={category} 
        status={status} 
        featured={featured} 
        countdownTo={countdownTo} 
      />
      <EventCardContent>
        <EventCardHeader title={title} description={description} href={props.href} datetime={datetime} />
        {(location || mode || organizer || attendees !== undefined) && (
          <EventCardDetails
            location={location}
            mode={mode}
            organizer={organizer}
            attendees={attendees}
          />
        )}
        {capacity !== undefined && registrations !== undefined && (
          <EventCardProgress capacity={capacity} registrations={registrations} />
        )}
        {(price || tags || primaryAction || secondaryAction || customAction) && (
          <EventCardFooter
            price={price}
            tags={tags}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            customAction={customAction}
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
EventCard.Countdown = EventCardCountdown;
EventCard.Progress = EventCardProgress;
EventCard.Skeleton = EventCardSkeleton;
