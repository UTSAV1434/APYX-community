"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    message,
  } as any);

  if (error) {
    console.error("Error submitting contact form:", error);
    return { error: "Failed to send message. Please try again later." };
  }

  return { success: true };
}

export async function toggleMessageStatus(id: string, is_read: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_submissions")
    .update({ is_read: !is_read })
    .eq("id", id);

  if (error) {
    console.error("Error updating message status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting message:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/messages");
}
