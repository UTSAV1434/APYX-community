"use server";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseTeamMemberFormData } from "@/lib/team-form";
import { TeamMember } from "@/types/database";

export async function getTeamMembers(activeOnly = false) {
  const supabase = await createClient();
  let query = supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("generation", { ascending: false });

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }

  return data as TeamMember[];
}

export const getTeamMemberById = cache(
  async (id: string): Promise<TeamMember | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return data as TeamMember;
  }
);

export async function createTeamMember(formData: FormData) {
  const parsed = parseTeamMemberFormData(formData);
  if (parsed.error || !parsed.data) {
    return { error: parsed.error ?? "Invalid form data" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("team_members").insert(parsed.data);

  if (error) {
    console.error("Error creating team member:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/team");
  revalidatePath("/team");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("team_members").delete().eq("id", id);

  if (error) {
    console.error("Error deleting team member:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/team");
  revalidatePath("/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const parsed = parseTeamMemberFormData(formData);
  if (parsed.error || !parsed.data) {
    return { error: parsed.error ?? "Invalid form data" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("team_members")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    console.error("Error updating team member:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/team");
  revalidatePath("/team");
  redirect("/admin/team");
}
