"use server";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminUser } from "@/lib/supabase/auth";
import { parseAnnouncementFormData } from "@/lib/announcement-form";
import { logActivity } from "@/lib/activity-log";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Announcement, AnnouncementCategory } from "@/types/database";

export const getAnnouncementBySlug = cache(async (slug: string): Promise<Announcement | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
});

export async function getRelatedAnnouncements(
  currentId: string,
  category: AnnouncementCategory,
  limit = 3
): Promise<Announcement[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .neq("id", currentId)
    .order("published_at", { ascending: false })
    .limit(12);

  if (error || !data) {
    return [];
  }

  const sameCategory = data.filter((a) => a.category === category);
  const other = data.filter((a) => a.category !== category);

  return [...sameCategory, ...other].slice(0, limit);
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }

  return data ?? [];
}

async function assertUniqueAnnouncementSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  slug: string,
  excludeId?: string
): Promise<string | null> {
  let query = supabase.from("announcements").select("id").eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data } = await query.maybeSingle();
  return data ? "An announcement with this slug already exists." : null;
}

export async function createAnnouncement(formData: FormData) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  const parsed = parseAnnouncementFormData(formData);
  if (parsed.error || !parsed.data) {
    return { error: parsed.error ?? "Invalid form data" };
  }

  const slugError = await assertUniqueAnnouncementSlug(
    auth.supabase,
    parsed.data.slug
  );
  if (slugError) {
    return { error: slugError };
  }

  const { data: created, error } = await auth.supabase
    .from("announcements")
    .insert({
      title: parsed.data.title,
      slug: parsed.data.slug,
      content: parsed.data.content,
      category: parsed.data.category,
      cover_image: parsed.data.cover_image,
      is_pinned: parsed.data.is_pinned,
      published_at: parsed.data.published_at,
      event_id: parsed.data.event_id,
    })
    .select("id")
    .single();

  if (error || !created) {
    console.error("Error creating announcement:", error);
    return { error: error?.message ?? "Failed to create announcement." };
  }

  await logActivity(auth.supabase, {
    action: "announcement_published",
    entity_type: "announcement",
    entity_id: created.id,
    summary: `New announcement: ${parsed.data.title}`,
  });

  revalidatePath("/admin/announcements");
  revalidatePath("/announcements");
  revalidatePath(`/announcements/${parsed.data.slug}`);
  revalidatePath("/");
  redirect("/admin/announcements");
}

export async function deleteAnnouncement(id: string) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  const { error } = await auth.supabase
    .from("announcements")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting announcement:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/announcements");
  revalidatePath("/announcements");
  revalidatePath("/");
}
