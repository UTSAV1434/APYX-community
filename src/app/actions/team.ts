"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TeamMember } from "@/types/database";

export async function getTeamMembers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("generation", { ascending: false });

  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
  
  return data as TeamMember[];
}

export async function createTeamMember(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const bio = formData.get("bio") as string;
  const photo = formData.get("photo") as string;
  const linkedin = formData.get("linkedin") as string;
  const github = formData.get("github") as string;
  const generation = formData.get("generation") as string;
  const is_active = formData.get("is_active") === "true";
  const sort_order = parseInt(formData.get("sort_order") as string || "0");

  const skillsString = formData.get("skills") as string;
  const skills = skillsString ? skillsString.split(",").map(s => s.trim()) : [];

  const { error } = await supabase.from("team_members").insert({
    name,
    position,
    bio: bio || null,
    photo: photo || null,
    linkedin: linkedin || null,
    github: github || null,
    generation,
    sort_order,
    is_active,
    skills,
  });

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
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const bio = formData.get("bio") as string;
  const photo = formData.get("photo") as string;
  const github = formData.get("github") as string;
  const linkedin = formData.get("linkedin") as string;
  
  const updates: any = {
    name,
    position,
    bio: bio || null,
    github: github || null,
    linkedin: linkedin || null,
  };
  
  if (photo) {
    updates.photo = photo;
  }

  const { error } = await supabase.from("team_members").update(updates).eq("id", id);

  if (error) {
    console.error("Error updating team member:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/team");
  revalidatePath("/team");
}
