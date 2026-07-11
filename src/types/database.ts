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
  created_at: string;
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

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type DefaultRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

type Table<
  Row extends Record<string, unknown>,
  Insert extends Record<string, unknown>,
  Update extends Record<string, unknown> = Partial<Insert>,
  Relationships extends DefaultRelationship[] = [],
> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: Relationships;
};

export type Database = {
  public: {
    Tables: {
      events: Table<
        Event & Record<string, unknown>,
        Omit<Event, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        }
      >;
      event_people: Table<
        EventPerson & Record<string, unknown>,
        Omit<EventPerson, "id"> & { id?: string }
      >;
      event_sponsors: Table<
        EventSponsor & Record<string, unknown>,
        Omit<EventSponsor, "id"> & { id?: string }
      >;
      announcements: Table<
        Announcement & Record<string, unknown>,
        Omit<Announcement, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        }
      >;
      gallery_albums: Table<
        GalleryAlbum & Record<string, unknown>,
        Omit<GalleryAlbum, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        },
        Partial<Omit<GalleryAlbum, "id" | "created_at"> & { id?: string; created_at?: string }>,
        [
          {
            foreignKeyName: "gallery_items_album_id_fkey";
            columns: ["id"];
            isOneToOne: false;
            referencedRelation: "gallery_items";
            referencedColumns: ["album_id"];
          },
          {
            foreignKeyName: "gallery_albums_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
        ]
      >;
      gallery_items: Table<
        GalleryItem & Record<string, unknown>,
        Omit<GalleryItem, "id" | "created_at"> & { id?: string; created_at?: string },
        Partial<Omit<GalleryItem, "id" | "created_at"> & { id?: string; created_at?: string }>,
        [
          {
            foreignKeyName: "gallery_items_album_id_fkey";
            columns: ["album_id"];
            isOneToOne: false;
            referencedRelation: "gallery_albums";
            referencedColumns: ["id"];
          },
        ]
      >;
      resources: Table<
        Resource & Record<string, unknown>,
        Omit<Resource, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        }
      >;
      team_members: Table<
        TeamMember & Record<string, unknown>,
        Omit<TeamMember, "id"> & { id?: string }
      >;
      partners: Table<
        Partner & Record<string, unknown>,
        Omit<Partner, "id"> & { id?: string }
      >;
      contact_submissions: Table<
        ContactSubmission & Record<string, unknown>,
        Omit<ContactSubmission, "id" | "created_at" | "is_read" | "subject"> & {
          id?: string;
          created_at?: string;
          is_read?: boolean;
          subject?: string | null;
        }
      >;
      newsletter_subscribers: Table<
        NewsletterSubscriber & Record<string, unknown>,
        Omit<NewsletterSubscriber, "id" | "subscribed_at"> & {
          id?: string;
          subscribed_at?: string;
        }
      >;
      activity_log: Table<
        ActivityLogEntry & Record<string, unknown>,
        Omit<ActivityLogEntry, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
