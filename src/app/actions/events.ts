"use server";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminUser } from "@/lib/supabase/auth";
import { parseEventFormData } from "@/lib/event-form";
import { logActivity } from "@/lib/activity-log";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Event } from "@/types/database";

export async function getEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching events:", JSON.stringify(error, null, 2));
    return [];
  }

  return (data ?? []) as Event[];
}

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

  return data as Event;
}

export const getEventById = cache(async (id: string): Promise<Event | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Event;
});

async function assertUniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  slug: string,
  excludeId?: string
): Promise<string | null> {
  let query = supabase.from("events").select("id").eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data } = await query.maybeSingle();
  return data ? "An event with this slug already exists." : null;
}

export async function createEvent(formData: FormData) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  const parsed = parseEventFormData(formData);
  if (parsed.error || !parsed.data) {
    return { error: parsed.error ?? "Invalid form data" };
  }

  const slugError = await assertUniqueSlug(auth.supabase, parsed.data.slug);
  if (slugError) {
    return { error: slugError };
  }

  const { data: created, error } = await auth.supabase
    .from("events")
    .insert({
      ...parsed.data,
      schedule: null,
      tracks: null,
      prizes: null,
      faqs: null,
      themes: null,
      registration_count: 0,
    })
    .select("id")
    .single();

  if (error || !created) {
    console.error("Error creating event:", error);
    return { error: error?.message ?? "Failed to create event." };
  }

  await logActivity(auth.supabase, {
    action: "event_created",
    entity_type: "event",
    entity_id: created.id,
    summary: `New event scheduled: ${parsed.data.title}`,
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath(`/events/${parsed.data.slug}`);
  revalidatePath("/");
  redirect("/admin/events");
}

export async function updateEvent(id: string, formData: FormData) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  const existing = await getEventById(id);
  if (!existing) {
    return { error: "Event not found." };
  }

  const parsed = parseEventFormData(formData);
  if (parsed.error || !parsed.data) {
    return { error: parsed.error ?? "Invalid form data" };
  }

  const slugError = await assertUniqueSlug(auth.supabase, parsed.data.slug, id);
  if (slugError) {
    return { error: slugError };
  }

  const { error } = await auth.supabase
    .from("events")
    .update({
      ...parsed.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating event:", error);
    return { error: error.message };
  }

  await logActivity(auth.supabase, {
    action: "event_updated",
    entity_type: "event",
    entity_id: id,
    summary: `Event updated: ${parsed.data.title}`,
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath(`/events/${existing.slug}`);
  revalidatePath(`/events/${parsed.data.slug}`);
  revalidatePath("/");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  const existing = await getEventById(id);

  const { error } = await auth.supabase.from("events").delete().eq("id", id);

  if (error) {
    console.error("Error deleting event:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/events");
  revalidatePath("/events");
  if (existing?.slug) {
    revalidatePath(`/events/${existing.slug}`);
  }
  revalidatePath("/");
}
