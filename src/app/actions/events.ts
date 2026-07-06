"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Event } from "@/types/database";

// Fetch all events for the admin or public lists
export async function getEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching events:", JSON.stringify(error, null, 2));
    return [];
  }
  return data.map(e => ({
    ...e,
    start_date: e.date || new Date().toISOString(),
    end_date: e.date || new Date().toISOString(),
    cover_image: e.banner_url || null,
    devfolio_url: e.devfolio_link || null,
    is_featured: false
  })) as Event[];
}

// Fetch a single event by slug for public detail page
export async function getEventBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching event by slug:", error);
    return null;
  }
  return {
    ...data,
    start_date: data.date || new Date().toISOString(),
    end_date: data.date || new Date().toISOString(),
    cover_image: data.banner_url || null,
    devfolio_url: data.devfolio_link || null,
    is_featured: false
  } as Event;
}

// Fetch a single event by ID for admin edit
export async function getEventById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching event by id:", error);
    return null;
  }
  return {
    ...data,
    start_date: data.date || new Date().toISOString(),
    end_date: data.date || new Date().toISOString(),
    cover_image: data.banner_url || null,
    devfolio_url: data.devfolio_link || null,
    is_featured: false
  } as Event;
}

// Create a new event matching the Database schema
export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const start_date = formData.get("start_date") as string;
  const end_date = formData.get("end_date") as string;
  const type = formData.get("type") as string;
  const status = formData.get("status") as string;
  const devfolio_url = formData.get("devfolio_url") as string;
  const location = formData.get("location") as string;
  const cover_image = formData.get("cover_image") as string;
  const is_featured = formData.get("is_featured") === "true";
  
  const registration_cap_raw = formData.get("registration_cap");
  const registration_cap = registration_cap_raw ? parseInt(registration_cap_raw as string, 10) : null;

  const max_team_size_raw = formData.get("max_team_size");
  const max_team_size = max_team_size_raw ? parseInt(max_team_size_raw as string, 10) : null;

  const { error } = await supabase.from("events").insert({
    title,
    slug,
    description,
    start_date,
    end_date,
    type: type as any,
    status: status as any,
    cover_image: cover_image || null,
    devfolio_url: devfolio_url || null,
    location: location || "TBD",
    is_featured,
    registration_cap,
    max_team_size,
    // Initialize JSONB fields to null to avoid errors
    schedule: null,
    tracks: null,
    prizes: null,
    faqs: null,
    themes: null,
    registration_count: 0
  } as any);

  if (error) {
    console.error("Error creating event:", error);
    return { error: error.message };
  }

  // Log activity
  await supabase.from("activity_log").insert({
    action: "event_created",
    entity_type: "event",
    entity_id: slug,
    summary: `New event scheduled: ${title}`,
  } as any);

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.from("events").delete().eq("id", id);
  
  if (error) {
    console.error("Error deleting event:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/events");
  revalidatePath("/events");
}
