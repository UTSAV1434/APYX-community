import { createClient } from "@/lib/supabase/server";

export async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { supabase, user: null, error: "Unauthorized. Please sign in again." };
  }

  return { supabase, user, error: null };
}
