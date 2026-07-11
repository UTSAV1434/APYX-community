"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createAnnouncement } from "@/app/actions/announcements";
import { AdminFormLayout } from "@/components/layout/admin-form-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { ANNOUNCEMENT_CATEGORY_OPTIONS } from "@/lib/announcement-form";
import { slugify } from "@/lib/slug";

export function AnnouncementForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const slugValue = String(formData.get("slug") ?? "").trim() || slugify(title);

    formData.set("title", title);
    formData.set("slug", slugValue);
    formData.set(
      "is_pinned",
      formData.get("is_pinned") === "on" ? "true" : "false"
    );
    formData.set("published_at", new Date().toISOString());

    const file = formData.get("cover_image_file") as File;
    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${slugValue}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("announcements")
        .upload(fileName, file);

      if (uploadError) {
        setError(`Failed to upload image: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("announcements").getPublicUrl(fileName);

      formData.set("cover_image", publicUrl);
    }

    const result = await createAnnouncement(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <AdminFormLayout
      title="Publish Announcement"
      description="Share news, updates, and resources with the community."
      backLink="/admin/announcements"
      backText="Back to Announcements"
      error={error}
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Title *</label>
        <Input
          name="title"
          required
          placeholder="New Fall Cohort Applications Open!"
          className="bg-apyx-bg border-apyx-border h-12"
          onChange={(e) => setSlug(slugify(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">URL Slug *</label>
        <Input
          name="slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="new-fall-cohort-applications-open"
          className="bg-apyx-bg border-apyx-border h-12 font-mono text-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Category *</label>
          <select
            name="category"
            required
            defaultValue="update"
            className="w-full bg-apyx-bg border border-apyx-border rounded-lg h-12 px-3 text-white focus:outline-none focus:ring-2 focus:ring-apyx-purple/50"
          >
            {ANNOUNCEMENT_CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Cover Image (Optional)
          </label>
          <Input
            name="cover_image_file"
            type="file"
            accept="image/*"
            className="bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_pinned"
          name="is_pinned"
          type="checkbox"
          className="h-4 w-4 rounded border-apyx-border bg-apyx-bg text-apyx-purple focus:ring-apyx-purple"
        />
        <label htmlFor="is_pinned" className="text-sm font-medium text-white">
          Pin this announcement to the top of the feed
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Content *</label>
        <Textarea
          name="content"
          required
          placeholder="Write your announcement here..."
          className="bg-apyx-bg border-apyx-border min-h-[250px] resize-y p-4"
        />
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
            "Publish Now"
          )}
        </Button>
      </div>
    </AdminFormLayout>
  );
}
