-- ==============================================================================
-- APYX COMMUNITY SUPABASE SCHEMA
-- Matches the frontend schema defined in src/types/database.ts
-- ==============================================================================

-- 1. CLEANUP EXISTING TABLES (Caution: Destructive!)
-- We drop existing objects with CASCADE so that dependent objects are dropped automatically.

DROP TABLE IF EXISTS public.activity_log CASCADE;
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS public.contact_submissions CASCADE;
DROP TABLE IF EXISTS public.partners CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.resources CASCADE;
DROP TABLE IF EXISTS public.gallery_items CASCADE;
DROP TABLE IF EXISTS public.gallery_albums CASCADE;
DROP TABLE IF EXISTS public.announcements CASCADE;
DROP TABLE IF EXISTS public.event_sponsors CASCADE;
DROP TABLE IF EXISTS public.event_people CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;

-- Drop incorrectly named legacy tables if they exist
DROP TABLE IF EXISTS public.albums CASCADE;
DROP TABLE IF EXISTS public.gallery CASCADE;

-- Drop Enums
DROP TYPE IF EXISTS public.event_type CASCADE;
DROP TYPE IF EXISTS public.event_status CASCADE;
DROP TYPE IF EXISTS public.announcement_category CASCADE;
DROP TYPE IF EXISTS public.resource_type CASCADE;
DROP TYPE IF EXISTS public.partner_type CASCADE;
DROP TYPE IF EXISTS public.sponsor_tier CASCADE;
DROP TYPE IF EXISTS public.event_person_role CASCADE;
DROP TYPE IF EXISTS public.gallery_item_type CASCADE;
DROP TYPE IF EXISTS public.activity_action CASCADE;


-- ==============================================================================
-- 2. ENUMS
-- ==============================================================================

CREATE TYPE public.event_type AS ENUM ('hackathon', 'workshop', 'seminar', 'meetup', 'competition');
CREATE TYPE public.event_status AS ENUM ('upcoming', 'ongoing', 'past', 'cancelled');
CREATE TYPE public.announcement_category AS ENUM ('event_launch', 'registration', 'speaker', 'partnership', 'results', 'update');
CREATE TYPE public.resource_type AS ENUM ('slides', 'rulebook', 'pdf', 'github', 'certificate', 'material');
CREATE TYPE public.partner_type AS ENUM ('sponsor', 'community', 'educational', 'industry');
CREATE TYPE public.sponsor_tier AS ENUM ('title', 'gold', 'silver', 'bronze', 'partner');
CREATE TYPE public.event_person_role AS ENUM ('speaker', 'judge', 'mentor');
CREATE TYPE public.gallery_item_type AS ENUM ('photo', 'video');
CREATE TYPE public.activity_action AS ENUM ('event_created', 'event_updated', 'announcement_published', 'gallery_uploaded', 'registration_opened', 'resource_added');


-- ==============================================================================
-- 3. TABLES
-- ==============================================================================

CREATE TABLE public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  type public.event_type NOT NULL,
  status public.event_status NOT NULL,
  cover_image text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text NOT NULL,
  is_featured boolean NOT NULL DEFAULT false,
  devfolio_url text,
  schedule jsonb,
  tracks jsonb,
  prizes jsonb,
  faqs jsonb,
  max_team_size integer,
  registration_count integer DEFAULT 0,
  registration_cap integer,
  themes jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.event_people (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  role public.event_person_role NOT NULL,
  photo text,
  bio text,
  linkedin text,
  designation text,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE public.event_sponsors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  logo text,
  tier public.sponsor_tier NOT NULL,
  website text,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE public.announcements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  category public.announcement_category NOT NULL,
  cover_image text,
  event_id uuid REFERENCES public.events(id) ON DELETE SET NULL,
  is_pinned boolean NOT NULL DEFAULT false,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.gallery_albums (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid REFERENCES public.events(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  cover_image text,
  event_date timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.gallery_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id uuid NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  type public.gallery_item_type NOT NULL DEFAULT 'photo',
  url text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.resources (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type public.resource_type NOT NULL,
  url text,
  file_path text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  position text NOT NULL,
  bio text,
  photo text,
  skills text[],
  linkedin text,
  github text,
  generation text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE public.partners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  logo text,
  type public.partner_type NOT NULL,
  website text,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE public.contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  unsubscribed_at timestamptz
);

CREATE TABLE public.activity_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  action public.activity_action NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  summary text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);


-- ==============================================================================
-- 4. INDEXES
-- ==============================================================================

CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_event_people_event_id ON public.event_people(event_id);
CREATE INDEX idx_event_sponsors_event_id ON public.event_sponsors(event_id);
CREATE INDEX idx_announcements_published_at ON public.announcements(published_at DESC);
CREATE INDEX idx_announcements_category ON public.announcements(category);
CREATE INDEX idx_gallery_items_album_id ON public.gallery_items(album_id);
CREATE INDEX idx_team_members_sort_order ON public.team_members(sort_order);
CREATE INDEX idx_partners_is_active ON public.partners(is_active);


-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Create generic public read policies and authenticated write policies for content tables
CREATE POLICY "Public Read Access" ON public.events FOR SELECT USING (true);
CREATE POLICY "Authenticated Write Access" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON public.event_people FOR SELECT USING (true);
CREATE POLICY "Authenticated Write Access" ON public.event_people FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON public.event_sponsors FOR SELECT USING (true);
CREATE POLICY "Authenticated Write Access" ON public.event_sponsors FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Authenticated Write Access" ON public.announcements FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON public.gallery_albums FOR SELECT USING (true);
CREATE POLICY "Authenticated Write Access" ON public.gallery_albums FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Authenticated Write Access" ON public.gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Authenticated Write Access" ON public.resources FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Authenticated Write Access" ON public.team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Authenticated Write Access" ON public.partners FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Submissions and Logs: Users can insert, Admins can read/manage
CREATE POLICY "Public Insert Access" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated All Access" ON public.contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Insert Access" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated All Access" ON public.newsletter_subscribers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Activity log is purely for admins to see actions
CREATE POLICY "Authenticated Read Access" ON public.activity_log FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated Insert Access" ON public.activity_log FOR INSERT TO authenticated WITH CHECK (true);

-- ==============================================================================
-- END OF SCHEMA
-- ==============================================================================
