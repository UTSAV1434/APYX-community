"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GalleryAlbum, GalleryItem } from "@/types/database";

export async function getAlbums() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_albums")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
  return data as GalleryAlbum[];
}

export async function getAlbumItems(albumId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("album_id", albumId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching album items:", error);
    return [];
  }
  return data as GalleryItem[];
}

export async function createAlbum(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const cover_image = formData.get("cover_image") as string;
  const event_date = formData.get("event_date") as string;

  const { data, error } = await supabase.from("gallery_albums").insert({
    title,
    description: description || null,
    cover_image: cover_image || null,
    event_date: event_date || null,
    event_id: null
  }).select().single();

  if (error) {
    console.error("Error creating album:", error);
    return { error: error.message };
  }

  // Log activity
  await supabase.from("activity_log").insert({
    action: "gallery_uploaded",
    entity_type: "gallery_album",
    entity_id: data.id,
    summary: `New photo album: ${title}`,
  } as any);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function deleteAlbum(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("gallery_albums").delete().eq("id", id);
  
  if (error) {
    console.error("Error deleting album:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function addGalleryItem(album_id: string, url: string, type: 'photo' | 'video' = 'photo') {
  const supabase = await createClient();

  const { error } = await supabase.from("gallery_items").insert({
    album_id,
    url,
    type,
    sort_order: 0,
    caption: null
  });

  if (error) {
    console.error("Error adding gallery item:", error);
    return { error: error.message };
  }

  revalidatePath(`/admin/gallery`);
  revalidatePath(`/gallery`);
  revalidatePath(`/`);
}

export async function deleteGalleryItem(id: string, url: string, albumId: string) {
  const supabase = await createClient();
  
  if (url.includes("supabase.co/storage/v1/object/public/gallery/")) {
    const fileName = url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }
  }

  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  
  if (error) {
    console.error("Error deleting gallery image:", error);
    return { error: error.message };
  }

  revalidatePath(`/admin/gallery/${albumId}`);
  revalidatePath(`/gallery`);
}

export async function bulkCreateGalleryItems(items: { album_id: string, url: string, caption?: string, type: 'photo' | 'video' }[], album_id: string) {
  const supabase = await createClient();

  if (!items.length) return { error: "No items provided" };

  const { error } = await supabase.from("gallery_items").insert(items.map(item => ({
    ...item,
    sort_order: 0
  })));

  if (error) {
    console.error("Error bulk creating gallery images:", error);
    return { error: error.message };
  }

  revalidatePath(`/admin/gallery/${album_id}`);
  revalidatePath(`/gallery`);
  revalidatePath(`/`);
}
