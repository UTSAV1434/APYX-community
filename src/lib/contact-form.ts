import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Must be a valid email address"),
  message: z.string().trim().min(1, "Message is required").max(5000),
  subject: z
    .string()
    .transform((value) => value.trim())
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .optional()
    .default(null),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function parseContactFormData(formData: FormData): {
  data?: ContactFormValues;
  error?: string;
} {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    message: formData.get("message") ?? "",
    subject: formData.get("subject") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  return { data: parsed.data };
}
