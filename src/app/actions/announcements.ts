"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Announcement } from "@/types/database";

export async function getAnnouncements() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
  return (data || []).map((a: any) => ({
    ...a,
    is_pinned: false,
    published_at: a.created_at,
    slug: a.title ? a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : a.id,
    cover_image: null,
    event_id: null
  })) as Announcement[];
}

export async function createAnnouncement(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const is_pinned = formData.get("is_pinned") === "true";
  const cover_image = formData.get("cover_image") as string;
  const published_at = formData.get("published_at") as string || new Date().toISOString();

  const { error } = await supabase.from("announcements").insert({
    title,
    slug,
    content,
    category: category as any,
    is_pinned,
    cover_image: cover_image || null,
    published_at,
    event_id: null,
  } as any);

  if (error) {
    console.error("Error creating announcement:", error);
    return { error: error.message };
  }

  // Log activity
  await supabase.from("activity_log").insert({
    action: "announcement_published",
    entity_type: "announcement",
    entity_id: slug,
    summary: `New announcement: ${title}`,
  } as any);

  revalidatePath("/admin/announcements");
  revalidatePath("/announcements");
  revalidatePath("/");
  redirect("/admin/announcements");
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  
  if (error) {
    console.error("Error deleting announcement:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/announcements");
  revalidatePath("/announcements");
  revalidatePath("/");
}
