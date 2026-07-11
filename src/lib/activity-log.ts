import type { SupabaseClient } from "@supabase/supabase-js";
import type { ActivityAction, Database } from "@/types/database";

type ActivityLogInsert =
  Database["public"]["Tables"]["activity_log"]["Insert"];

export async function logActivity(
  supabase: SupabaseClient<Database>,
  entry: {
    action: ActivityAction;
    entity_type: string;
    entity_id: string;
    summary: string;
  }
) {
  const payload: ActivityLogInsert = {
    action: entry.action,
    entity_type: entry.entity_type,
    entity_id: entry.entity_id,
    summary: entry.summary,
  };

  return supabase.from("activity_log").insert(payload);
}
