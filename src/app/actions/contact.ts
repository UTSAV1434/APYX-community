"use server";

import { createClient } from "@/lib/supabase/server";
import { parseContactFormData } from "@/lib/contact-form";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const parsed = parseContactFormData(formData);
  if (parsed.error || !parsed.data) {
    return { error: parsed.error ?? "Invalid form data" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    subject: parsed.data.subject,
  });

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
