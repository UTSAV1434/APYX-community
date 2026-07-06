"use client";

import { useState } from "react";
import { createAnnouncement } from "@/app/actions/announcements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NewAnnouncementPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    // Handle File Upload
    const file = formData.get("cover_image_file") as File;
    if (file && file.size > 0) {
      const title = formData.get("title") as string;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const fileExt = file.name.split('.').pop();
      const fileName = `${slug}-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('announcements')
        .upload(fileName, file);

      if (uploadError) {
        setError(`Failed to upload image: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('announcements')
        .getPublicUrl(fileName);
        
      formData.set("cover_image", publicUrl);
    }

    const result = await createAnnouncement(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/announcements" className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Announcements
        </Link>
        <h1 className="text-3xl font-bold font-heading text-white mb-2">Publish Announcement</h1>
        <p className="text-apyx-text-secondary">Share news, updates, and resources with the community.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-apyx-surface border border-apyx-border rounded-3xl p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Title</label>
          <Input name="title" required placeholder="New Fall Cohort Applications Open!" className="bg-apyx-bg border-apyx-border h-12" />
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Category</label>
            <select name="category" required className="w-full bg-apyx-bg border border-apyx-border rounded-lg h-12 px-3 text-white focus:outline-none focus:ring-2 focus:ring-apyx-purple/50">
              <option value="update">Update</option>
              <option value="event_launch">Event Launch</option>
              <option value="registration">Registration</option>
              <option value="speaker">Speaker</option>
              <option value="partnership">Partnership</option>
              <option value="results">Results</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Cover Image (Optional)</label>
            <Input name="cover_image_file" type="file" accept="image/*" className="bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white flex items-center gap-2 cursor-pointer mt-2">
            <input type="checkbox" name="is_pinned" value="true" className="w-4 h-4 rounded border-apyx-border bg-apyx-bg text-apyx-purple focus:ring-apyx-purple" />
            <span>Pin this announcement to the top of the feed</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Content</label>
          <Textarea name="content" required placeholder="Write your announcement here..." className="bg-apyx-bg border-apyx-border min-h-[250px] resize-y p-4" />
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-apyx-purple hover:bg-apyx-purple/90 text-white min-w-[150px]">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Now"}
          </Button>
        </div>
      </form>
    </div>
  );
}
