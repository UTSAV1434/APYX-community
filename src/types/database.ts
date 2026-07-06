// APYX Database Types — matches Supabase schema from blueprint v2

export type EventType = 'hackathon' | 'workshop' | 'seminar' | 'meetup' | 'competition';
export type EventStatus = 'upcoming' | 'ongoing' | 'past' | 'cancelled';
export type AnnouncementCategory = 'event_launch' | 'registration' | 'speaker' | 'partnership' | 'results' | 'update';
export type ResourceType = 'slides' | 'rulebook' | 'pdf' | 'github' | 'certificate' | 'material';
export type PartnerType = 'sponsor' | 'community' | 'educational' | 'industry';
export type SponsorTier = 'title' | 'gold' | 'silver' | 'bronze' | 'partner';
export type EventPersonRole = 'speaker' | 'judge' | 'mentor';
export type GalleryItemType = 'photo' | 'video';
export type ActivityAction = 'event_created' | 'event_updated' | 'announcement_published' | 'gallery_uploaded' | 'registration_opened' | 'resource_added';

// ─── Schedule & Sub-types ────────────────────────────────────────

export interface ScheduleEntry {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  location?: string;
  type?: 'ceremony' | 'workshop' | 'talk' | 'break' | 'social' | 'hacking';
}

export interface ScheduleDay {
  day: string; // e.g., "Day 1 - Jan 15"
  date: string; // ISO date
  entries: ScheduleEntry[];
}

export interface Track {
  name: string;
  icon?: string;
  description: string;
  prize?: string;
}

export interface Prize {
  position: string; // "1st", "2nd", "3rd", or custom
  title: string;
  amount?: string;
  description?: string;
  isSpecial?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Theme {
  name: string;
  icon?: string;
  description: string;
  examples?: string[];
  color?: string;
}

// ─── Core Entities ───────────────────────────────────────────────

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: EventType;
  status: EventStatus;
  cover_image: string | null;
  start_date: string;
  end_date: string;
  location: string;
  is_featured: boolean;
  devfolio_url: string | null;
  schedule: ScheduleDay[] | null;
  tracks: Track[] | null;
  prizes: Prize[] | null;
  faqs: FAQ[] | null;
  max_team_size: number | null;
  registration_count: number | null;
  registration_cap: number | null;
  themes: Theme[] | null;
  created_at: string;
  updated_at: string;
}

export interface EventPerson {
  id: string;
  event_id: string;
  name: string;
  role: EventPersonRole;
  photo: string | null;
  bio: string | null;
  linkedin: string | null;
  designation: string | null;
  sort_order: number;
}

export interface EventSponsor {
  id: string;
  event_id: string;
  name: string;
  logo: string | null;
  tier: SponsorTier;
  website: string | null;
  sort_order: number;
}

export interface Announcement {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: AnnouncementCategory;
  cover_image: string | null;
  event_id: string | null;
  is_pinned: boolean;
  published_at: string;
  created_at: string;
}

export interface GalleryAlbum {
  id: string;
  event_id: string | null;
  title: string;
  description: string | null;
  cover_image: string | null;
  event_date: string | null;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  album_id: string;
  type: GalleryItemType;
  url: string;
  caption: string | null;
  sort_order: number;
}

export interface Resource {
  id: string;
  event_id: string | null;
  title: string;
  description: string | null;
  type: ResourceType;
  url: string | null;
  file_path: string | null;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  photo: string | null;
  skills: string[] | null;
  linkedin: string | null;
  github: string | null;
  generation: string;
  sort_order: number;
  is_active: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string | null;
  type: PartnerType;
  website: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export interface ActivityLogEntry {
  id: string;
  action: ActivityAction;
  entity_type: string;
  entity_id: string;
  summary: string;
  created_at: string;
}

// ─── Supabase Database Type Map ──────────────────────────────────

export interface Database {
  public: {
    Tables: {
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>;
      };
      event_people: {
        Row: EventPerson;
        Insert: Omit<EventPerson, 'id'>;
        Update: Partial<Omit<EventPerson, 'id'>>;
      };
      event_sponsors: {
        Row: EventSponsor;
        Insert: Omit<EventSponsor, 'id'>;
        Update: Partial<Omit<EventSponsor, 'id'>>;
      };
      announcements: {
        Row: Announcement;
        Insert: Omit<Announcement, 'id' | 'created_at'>;
        Update: Partial<Omit<Announcement, 'id' | 'created_at'>>;
      };
      gallery_albums: {
        Row: GalleryAlbum;
        Insert: Omit<GalleryAlbum, 'id' | 'created_at'>;
        Update: Partial<Omit<GalleryAlbum, 'id' | 'created_at'>>;
      };
      gallery_items: {
        Row: GalleryItem;
        Insert: Omit<GalleryItem, 'id'>;
        Update: Partial<Omit<GalleryItem, 'id'>>;
      };
      resources: {
        Row: Resource;
        Insert: Omit<Resource, 'id' | 'created_at'>;
        Update: Partial<Omit<Resource, 'id' | 'created_at'>>;
      };
      team_members: {
        Row: TeamMember;
        Insert: Omit<TeamMember, 'id'>;
        Update: Partial<Omit<TeamMember, 'id'>>;
      };
      partners: {
        Row: Partner;
        Insert: Omit<Partner, 'id'>;
        Update: Partial<Omit<Partner, 'id'>>;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, 'id' | 'created_at'>;
        Update: Partial<Omit<ContactSubmission, 'id' | 'created_at'>>;
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriber;
        Insert: Omit<NewsletterSubscriber, 'id' | 'subscribed_at'>;
        Update: Partial<Omit<NewsletterSubscriber, 'id' | 'subscribed_at'>>;
      };
      activity_log: {
        Row: ActivityLogEntry;
        Insert: Omit<ActivityLogEntry, 'id' | 'created_at'>;
        Update: Partial<Omit<ActivityLogEntry, 'id' | 'created_at'>>;
      };
    };
  };
}
