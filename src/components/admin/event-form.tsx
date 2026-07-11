"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AdminFormLayout } from "@/components/layout/admin-form-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import {
  EVENT_STATUS_OPTIONS,
  EVENT_TYPE_OPTIONS,
  formatDateTimeLocal,
  slugifyEventTitle,
} from "@/lib/event-form";
import type { Event } from "@/types/database";

interface EventFormProps {
  event?: Event;
  title: string;
  description: string;
  submitLabel: string;
  onSubmit: (formData: FormData) => Promise<{ error?: string } | void>;
}

async function uploadEventCover(
  file: File,
  slug: string
): Promise<{ url?: string; error?: string }> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${slug}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("events")
    .upload(fileName, file);

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("events").getPublicUrl(fileName);

  return { url: publicUrl };
}

export function EventForm({
  event,
  title,
  description,
  submitLabel,
  onSubmit,
}: EventFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(event?.slug ?? "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const titleValue = (formData.get("title") as string).trim();
    const slugValue =
      (formData.get("slug") as string).trim() || slugifyEventTitle(titleValue);

    formData.set("title", titleValue);
    formData.set("slug", slugValue);
    formData.set(
      "is_featured",
      formData.get("is_featured") === "on" ? "true" : "false"
    );

    const file = formData.get("cover_image_file") as File;
    if (file && file.size > 0) {
      const upload = await uploadEventCover(file, slugValue);
      if (upload.error) {
        setError(`Failed to upload image: ${upload.error}`);
        setLoading(false);
        return;
      }
      formData.set("cover_image", upload.url!);
    } else if (event?.cover_image) {
      formData.set("cover_image", event.cover_image);
    }

    const result = await onSubmit(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <AdminFormLayout
      title={title}
      description={description}
      backLink="/admin/events"
      backText="Back to Events"
      error={error}
      onSubmit={handleSubmit}
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Event Title *</label>
          <Input
            name="title"
            required
            defaultValue={event?.title}
            placeholder="APYX Hackathon 2026"
            className="bg-apyx-bg border-apyx-border h-12"
            onChange={(e) => {
              if (!event) {
                setSlug(slugifyEventTitle(e.target.value));
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">URL Slug *</label>
          <Input
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="apyx-hackathon-2026"
            className="bg-apyx-bg border-apyx-border h-12 font-mono text-sm"
          />
          <p className="text-xs text-apyx-text-muted">
            Public URL: /events/{slug || "your-slug"}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Event Type *</label>
          <select
            name="type"
            required
            defaultValue={event?.type ?? "hackathon"}
            className="w-full bg-apyx-bg border border-apyx-border rounded-lg h-12 px-3 text-white focus:outline-none focus:ring-2 focus:ring-apyx-purple/50"
          >
            {EVENT_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Status *</label>
          <select
            name="status"
            required
            defaultValue={event?.status ?? "upcoming"}
            className="w-full bg-apyx-bg border border-apyx-border rounded-lg h-12 px-3 text-white focus:outline-none focus:ring-2 focus:ring-apyx-purple/50"
          >
            {EVENT_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Start Date & Time *
          </label>
          <Input
            name="start_date"
            type="datetime-local"
            required
            defaultValue={
              event?.start_date ? formatDateTimeLocal(event.start_date) : ""
            }
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            End Date & Time *
          </label>
          <Input
            name="end_date"
            type="datetime-local"
            required
            defaultValue={
              event?.end_date ? formatDateTimeLocal(event.end_date) : ""
            }
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_featured"
          name="is_featured"
          type="checkbox"
          defaultChecked={event?.is_featured ?? false}
          className="h-4 w-4 rounded border-apyx-border bg-apyx-bg text-apyx-purple focus:ring-apyx-purple"
        />
        <label htmlFor="is_featured" className="text-sm font-medium text-white">
          Feature this event on the homepage
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Description *</label>
        <Textarea
          name="description"
          required
          defaultValue={event?.description}
          placeholder="Describe the event..."
          className="bg-apyx-bg border-apyx-border min-h-[150px] resize-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Location *</label>
          <Input
            name="location"
            required
            defaultValue={event?.location}
            placeholder="Main Campus Hub, Floor 3"
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Cover Image</label>
          {event?.cover_image && (
            <div className="mb-2">
              <span className="text-xs text-apyx-text-muted block mb-1">
                Current cover:
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.cover_image}
                alt={event.title}
                className="w-full max-w-xs aspect-video rounded-lg object-cover border border-apyx-border"
              />
            </div>
          )}
          <Input
            name="cover_image_file"
            type="file"
            accept="image/*"
            className="bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer"
          />
          {event && (
            <p className="text-xs text-apyx-text-muted">
              Leave blank to keep the current cover image.
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Registration Cap
          </label>
          <Input
            name="registration_cap"
            type="number"
            min={1}
            defaultValue={event?.registration_cap ?? ""}
            placeholder="200"
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Max Team Size</label>
          <Input
            name="max_team_size"
            type="number"
            min={1}
            defaultValue={event?.max_team_size ?? ""}
            placeholder="4"
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Devfolio URL</label>
          <Input
            name="devfolio_url"
            type="url"
            defaultValue={event?.devfolio_url ?? ""}
            placeholder="https://apyx.devfolio.co"
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="bg-apyx-purple hover:bg-apyx-purple/90 text-white min-w-[150px]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </AdminFormLayout>
  );
}
