"use client";

import { useState } from "react";
import { createAlbum } from "@/app/actions/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NewAlbumPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const file = formData.get("cover_file") as File;

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `album-cover-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file);

      if (uploadError) {
        setError(`Failed to upload cover: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);
        
      formData.set("cover_image", publicUrl);
    }

    const result = await createAlbum(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/gallery" className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
        </Link>
        <h1 className="text-3xl font-bold font-heading text-white mb-2">Create New Album</h1>
        <p className="text-apyx-text-secondary">Create a folder to group photos for a specific event.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-apyx-surface border border-apyx-border rounded-3xl p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Album Title</label>
            <Input name="title" required placeholder="Hackathon 2026" className="bg-apyx-bg border-apyx-border h-12" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Event Date</label>
            <Input name="event_date" type="date" required className="bg-apyx-bg border-apyx-border h-12" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Description</label>
          <Textarea name="description" placeholder="Photos from our spring hackathon event..." className="bg-apyx-bg border-apyx-border resize-none" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Cover Photo</label>
          <Input name="cover_file" type="file" accept="image/*" className="bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer" />
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-apyx-purple hover:bg-apyx-purple/90 text-white min-w-[150px]">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Album"}
          </Button>
        </div>
      </form>
    </div>
  );
}
