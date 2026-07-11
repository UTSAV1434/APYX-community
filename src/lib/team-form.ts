import { z } from "zod";

const optionalUrl = z
  .string()
  .transform((value) => value.trim())
  .pipe(
    z.union([z.literal(""), z.string().url("Must be a valid URL")])
  )
  .transform((value) => (value === "" ? null : value));

export const teamMemberFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  position: z.string().trim().min(1, "Position is required").max(120),
  bio: z
    .string()
    .transform((value) => value.trim())
    .transform((value) => (value === "" ? null : value)),
  photo: z
    .string()
    .nullable()
    .optional()
    .transform((value) => (value && value.trim() !== "" ? value : null)),
  linkedin: optionalUrl,
  github: optionalUrl,
  generation: z.string().trim().min(1, "Generation is required").max(50),
  sort_order: z.coerce.number().int().min(0, "Sort order must be 0 or greater"),
  is_active: z.boolean(),
  skills: z.array(z.string().trim().min(1)).default([]),
});

export type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>;

export function parseSkillsInput(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

export function parseTeamMemberFormData(formData: FormData): {
  data?: TeamMemberFormValues;
  error?: string;
} {
  const parsed = teamMemberFormSchema.safeParse({
    name: formData.get("name") ?? "",
    position: formData.get("position") ?? "",
    bio: formData.get("bio") ?? "",
    photo: (formData.get("photo") as string | null) ?? null,
    linkedin: formData.get("linkedin") ?? "",
    github: formData.get("github") ?? "",
    generation: formData.get("generation") ?? "",
    sort_order: formData.get("sort_order") ?? "0",
    is_active: formData.get("is_active") === "true",
    skills: parseSkillsInput(formData.get("skills") as string | null),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  return { data: parsed.data };
}

export function formatSkillsForInput(skills: string[] | null | undefined): string {
  return skills?.join(", ") ?? "";
}
