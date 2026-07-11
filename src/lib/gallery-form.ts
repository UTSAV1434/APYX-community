import { z } from "zod";

export const galleryAlbumFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z
    .string()
    .transform((value) => value.trim())
    .transform((value) => (value === "" ? null : value)),
  cover_image: z
    .union([z.string().url(), z.literal(""), z.null()])
    .optional()
    .transform((value) => (value && value !== "" ? value : null)),
  event_date: z
    .string()
    .transform((value) => value.trim())
    .transform((value) => (value === "" ? null : value)),
  event_id: z.string().uuid().nullable().optional().default(null),
});

export type GalleryAlbumFormValues = z.infer<typeof galleryAlbumFormSchema>;

export function parseGalleryAlbumFormData(
  formData: FormData,
  options?: { requireEventDate?: boolean }
): {
  data?: GalleryAlbumFormValues;
  error?: string;
} {
  const eventDateRaw = String(formData.get("event_date") ?? "").trim();

  if (options?.requireEventDate && !eventDateRaw) {
    return { error: "Event date is required" };
  }

  const parsed = galleryAlbumFormSchema.safeParse({
    title: formData.get("title") ?? "",
    description: formData.get("description") ?? "",
    cover_image: (formData.get("cover_image") as string | null) ?? null,
    event_date: eventDateRaw,
    event_id: null,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  return { data: parsed.data };
}
