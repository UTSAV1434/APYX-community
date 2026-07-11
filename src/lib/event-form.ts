import { z } from "zod";
import type { EventStatus, EventType } from "@/types/database";
import { slugify } from "@/lib/slug";

const eventTypes = [
  "hackathon",
  "workshop",
  "seminar",
  "meetup",
  "competition",
] as const satisfies readonly EventType[];

const eventStatuses = [
  "upcoming",
  "ongoing",
  "past",
  "cancelled",
] as const satisfies readonly EventStatus[];

const optionalUrl = z
  .string()
  .transform((value) => value.trim())
  .pipe(
    z.union([z.literal(""), z.string().url("Must be a valid URL")])
  )
  .transform((value) => (value === "" ? null : value));

const optionalPositiveInt = z.preprocess(
  (value) =>
    value === "" || value === null || value === undefined ? null : value,
  z.union([z.coerce.number().int().positive(), z.null()])
);

export const eventFormSchema = z
  .object({
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
    description: z.string().trim().min(1, "Description is required").max(10000),
    type: z.enum(eventTypes),
    status: z.enum(eventStatuses),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    location: z.string().trim().min(1, "Location is required").max(300),
    cover_image: z
      .union([z.string().url(), z.literal(""), z.null()])
      .optional()
      .transform((value) => (value && value !== "" ? value : null)),
    devfolio_url: optionalUrl,
    is_featured: z.boolean(),
    registration_cap: optionalPositiveInt,
    max_team_size: optionalPositiveInt,
  })
  .refine(
    (data) => new Date(data.end_date).getTime() >= new Date(data.start_date).getTime(),
    {
      message: "End date must be on or after the start date",
      path: ["end_date"],
    }
  );

export type EventFormValues = z.infer<typeof eventFormSchema>;

export function slugifyEventTitle(title: string): string {
  return slugify(title);
}

export function parseEventFormData(formData: FormData): {
  data?: EventFormValues;
  error?: string;
} {
  const parsed = eventFormSchema.safeParse({
    title: formData.get("title") ?? "",
    slug: formData.get("slug") ?? "",
    description: formData.get("description") ?? "",
    type: formData.get("type") ?? "",
    status: formData.get("status") ?? "",
    start_date: formData.get("start_date") ?? "",
    end_date: formData.get("end_date") ?? "",
    location: formData.get("location") ?? "",
    cover_image: (formData.get("cover_image") as string | null) ?? null,
    devfolio_url: formData.get("devfolio_url") ?? "",
    is_featured: formData.get("is_featured") === "true",
    registration_cap: formData.get("registration_cap") ?? "",
    max_team_size: formData.get("max_team_size") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  return { data: parsed.data };
}

export function formatDateTimeLocal(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export const EVENT_TYPE_OPTIONS = eventTypes;
export const EVENT_STATUS_OPTIONS = eventStatuses;
