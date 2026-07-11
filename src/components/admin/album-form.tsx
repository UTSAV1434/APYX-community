"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createAlbum } from "@/app/actions/gallery";
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
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-white mb-2">
          {title}
        </h1>
        <p className="text-apyx-text-secondary">{description}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-apyx-surface border border-apyx-border rounded-3xl p-6 sm:p-8 space-y-6"
      >
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Album Title *</label>
          <Input
            name="title"
            required
            placeholder="Hackathon 2026"
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Description</label>
          <Textarea
            name="description"
            placeholder="Photos from our spring hackathon event..."
            className="bg-apyx-bg border-apyx-border resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Event Date{requireEventDate ? " *" : ""}
          </label>
          <Input
            name="event_date"
            type="date"
            required={requireEventDate}
            className="bg-apyx-bg border-apyx-border h-12 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Cover Photo</label>
          <Input
            name="cover_file"
            type="file"
            accept="image/*"
            className="bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-apyx-purple/10 file:text-apyx-purple hover:file:bg-apyx-purple/20"
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
      </form>
    </div>
  );
}
