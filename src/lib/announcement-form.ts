import { z } from "zod";
import type { AnnouncementCategory } from "@/types/database";
import { slugify } from "@/lib/slug";

const announcementCategories = [
  "event_launch",
  "registration",
  "speaker",
  "partnership",
  "results",
  "update",
] as const satisfies readonly AnnouncementCategory[];

export const announcementFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must use lowercase letters, numbers, and hyphens"
    ),
  content: z.string().trim().min(1, "Content is required").max(20000),
  category: z.enum(announcementCategories),
  cover_image: z
    .union([z.string().url(), z.literal(""), z.null()])
    .optional()
    .transform((value) => (value && value !== "" ? value : null)),
  is_pinned: z.boolean(),
  published_at: z.string().datetime({ offset: true }),
  event_id: z.string().uuid().nullable().optional().default(null),
});

export type AnnouncementFormValues = z.infer<typeof announcementFormSchema>;

export const ANNOUNCEMENT_CATEGORY_OPTIONS = announcementCategories;

export function parseAnnouncementFormData(formData: FormData): {
  data?: AnnouncementFormValues;
  error?: string;
} {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const publishedAtRaw = String(formData.get("published_at") ?? "").trim();

  const parsed = announcementFormSchema.safeParse({
    title,
    slug: slugInput || slugify(title),
    content: formData.get("content") ?? "",
    category: formData.get("category") ?? "",
    cover_image: (formData.get("cover_image") as string | null) ?? null,
    is_pinned: formData.get("is_pinned") === "true",
    published_at: publishedAtRaw || new Date().toISOString(),
    event_id: null,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  return { data: parsed.data };
}
