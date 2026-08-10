"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createAlbum } from "@/app/actions/gallery";
import { AdminFormLayout } from "@/components/layout/admin-form-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

interface AlbumFormProps {
  title: string;
  description: string;
  submitLabel: string;
  requireEventDate?: boolean;
}

async function uploadAlbumCover(
  file: File
): Promise<{ url?: string; error?: string }> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `album-cover-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(fileName, file);

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("gallery").getPublicUrl(fileName);

  return { url: publicUrl };
}

export function AlbumForm({
  title,
  description,
  submitLabel,
  requireEventDate = false,
}: AlbumFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("cover_file") as File;

    if (file && file.size > 0) {
      const upload = await uploadAlbumCover(file);
      if (upload.error) {
        setError(`Failed to upload cover: ${upload.error}`);
        setLoading(false);
        return;
      }
      formData.set("cover_image", upload.url!);
    }

    const result = await createAlbum(formData, { requireEventDate });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <AdminFormLayout
      title={title}
      description={description}
      backLink="/admin/gallery"
      backText="Back to Gallery"
      error={error}
      onSubmit={handleSubmit}
    >
      <Input
        label="Album Title"
        name="title"
        required
        placeholder="Hackathon 2026"
      />

      <Textarea
        label="Description"
        name="description"
        placeholder="Photos from our spring hackathon event..."
        className="resize-none"
      />

      <Input
        label={`Event Date${requireEventDate ? "" : " (Optional)"}`}
        name="event_date"
        type="date"
        required={requireEventDate}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-apyx-text-secondary">
          Cover Photo
        </label>
        <Input
          name="cover_file"
          type="file"
          accept="image/*"
          className="text-apyx-text-secondary cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-apyx-purple/10 file:text-apyx-purple hover:file:bg-apyx-purple/20"
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
            submitLabel
          )}
        </Button>
      </div>
    </AdminFormLayout>
  );
}
