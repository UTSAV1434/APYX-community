"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdminUser } from "@/lib/supabase/auth";
import { parseGalleryAlbumFormData } from "@/lib/gallery-form";
import { logActivity } from "@/lib/activity-log";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { GalleryAlbum, GalleryItem } from "@/types/database";

export async function getAlbums(): Promise<GalleryAlbum[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_albums")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching albums:", error);
    return [];
  }

  return data ?? [];
}

export async function getAlbumItems(albumId: string): Promise<GalleryItem[]> {
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

  return data ?? [];
}

export async function createAlbum(
  formData: FormData,
  options?: { requireEventDate?: boolean }
) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  const parsed = parseGalleryAlbumFormData(formData, options);
  if (parsed.error || !parsed.data) {
    return { error: parsed.error ?? "Invalid form data" };
  }

  const { data, error } = await auth.supabase
    .from("gallery_albums")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description,
      cover_image: parsed.data.cover_image,
      event_date: parsed.data.event_date,
      event_id: parsed.data.event_id,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Error creating album:", error);
    return { error: error?.message ?? "Failed to create album." };
  }

  await logActivity(auth.supabase, {
    action: "gallery_uploaded",
    entity_type: "gallery_album",
    entity_id: data.id,
    summary: `New photo album: ${parsed.data.title}`,
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function deleteAlbum(id: string) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  const { error } = await auth.supabase
    .from("gallery_albums")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting album:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function addGalleryItem(
  album_id: string,
  url: string,
  type: "photo" | "video" = "photo"
) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  const { error } = await auth.supabase.from("gallery_items").insert({
    album_id,
    url,
    type,
    sort_order: 0,
    caption: null,
  });

  if (error) {
    console.error("Error adding gallery item:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${album_id}`);
  revalidatePath("/");
}

export async function deleteGalleryItem(
  id: string,
  url: string,
  albumId: string
) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  if (url.includes("supabase.co/storage/v1/object/public/gallery/")) {
    const fileName = url.split("/").pop();
    if (fileName) {
      await auth.supabase.storage.from("gallery").remove([fileName]);
    }
  }

  const { error } = await auth.supabase
    .from("gallery_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting gallery image:", error);
    return { error: error.message };
  }

  revalidatePath(`/admin/gallery/${albumId}`);
  revalidatePath(`/gallery/${albumId}`);
  revalidatePath("/gallery");
}

export async function bulkCreateGalleryItems(
  items: {
    album_id: string;
    url: string;
    caption?: string;
    type: "photo" | "video";
  }[],
  album_id: string
) {
  const auth = await requireAdminUser();
  if (auth.error) {
    return { error: auth.error };
  }

  if (!items.length) return { error: "No items provided" };

  const { error } = await auth.supabase.from("gallery_items").insert(
    items.map((item) => ({
      album_id: item.album_id,
      url: item.url,
      caption: item.caption ?? null,
      type: item.type,
      sort_order: 0,
    }))
  );

  if (error) {
    console.error("Error bulk creating gallery images:", error);
    return { error: error.message };
  }

  revalidatePath(`/admin/gallery/${album_id}`);
  revalidatePath(`/gallery/${album_id}`);
  revalidatePath("/gallery");
  revalidatePath("/");
}
