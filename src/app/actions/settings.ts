"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Json } from "@/types/database";

export async function getSetting<T>(key: string): Promise<T | null> {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      console.error(`Error fetching setting ${key}:`, error);
      return null;
    }

    return data?.value as T;
  } catch (error) {
    console.error(`Unexpected error fetching setting ${key}:`, error);
    return null;
  }
}

export async function updateSetting(key: string, value: Json) {
  const supabase = await createClient();
  
  try {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ 
        key, 
        value,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      });

    if (error) {
      console.error(`Error updating setting ${key}:`, error);
      return { success: false, error: error.message };
    }

    // Revalidate paths that use these settings
    revalidatePath("/");
    revalidatePath("/admin/homepage");
    
    return { success: true };
  } catch (error: any) {
    console.error(`Unexpected error updating setting ${key}:`, error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}
