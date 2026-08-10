"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createAnnouncement } from "@/app/actions/announcements";
import { AdminFormLayout } from "@/components/layout/admin-form-layout";
import { AdminSelect } from "@/components/admin/admin-select";
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
      <Input
        label="Title"
        name="title"
        required
        placeholder="New Fall Cohort Applications Open!"
        onChange={(e) => setSlug(slugify(e.target.value))}
      />

      <div className="space-y-2">
        <label htmlFor="slug-field" className="text-sm font-medium text-apyx-text-secondary">
          URL Slug<span className="text-apyx-rose ml-1">*</span>
        </label>
        <Input
          id="slug-field"
          name="slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="new-fall-cohort-applications-open"
          className="font-mono text-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <AdminSelect
          label="Category"
          name="category"
          required
          defaultValue="update"
          options={ANNOUNCEMENT_CATEGORY_OPTIONS.map((category) => ({
            value: category,
            label: category.replace(/_/g, " "),
          }))}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-apyx-text-secondary">
            Cover Image (Optional)
          </label>
          <Input
            name="cover_image_file"
            type="file"
            accept="image/*"
            className="text-apyx-text-secondary cursor-pointer"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer group w-fit">
        <input
          id="is_pinned"
          name="is_pinned"
          type="checkbox"
          className="h-4 w-4 rounded border-apyx-border bg-apyx-surface text-apyx-purple focus:ring-apyx-purple accent-apyx-purple"
        />
        <span className="text-sm font-medium text-apyx-text-secondary group-hover:text-white transition-colors">
          Pin this announcement to the top of the feed
        </span>
      </label>

      <Textarea
        label="Content"
        name="content"
        required
        placeholder="Write your announcement here..."
        className="min-h-[250px] resize-y p-4"
      />

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
