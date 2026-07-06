"use client";

import { useState } from "react";
import { createEvent } from "@/app/actions/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NewEventPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    formData.append("slug", slug);

    // Handle File Upload
    const file = formData.get("cover_image_file") as File;
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${slug}-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('events')
        .upload(fileName, file);

      if (uploadError) {
        setError(`Failed to upload image: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(fileName);
        
      formData.set("cover_image", publicUrl);
    }

    const result = await createEvent(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/events" className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
        </Link>
        <h1 className="text-3xl font-bold font-heading text-white mb-2">Create New Event</h1>
        <p className="text-apyx-text-secondary">Publish a new hackathon, workshop, or meetup to the platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-apyx-surface border border-apyx-border rounded-3xl p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Event Title</label>
            <Input name="title" required placeholder="APYX Hackathon 2026" className="bg-apyx-bg border-apyx-border h-12" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Event Type</label>
            <select name="type" required className="w-full bg-apyx-bg border border-apyx-border rounded-lg h-12 px-3 text-white focus:outline-none focus:ring-2 focus:ring-apyx-purple/50">
              <option value="hackathon">Hackathon</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="meetup">Meetup</option>
              <option value="competition">Competition</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Start Date & Time</label>
            <Input name="start_date" type="datetime-local" required className="bg-apyx-bg border-apyx-border h-12" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">End Date & Time</label>
            <Input name="end_date" type="datetime-local" required className="bg-apyx-bg border-apyx-border h-12" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Status</label>
            <select name="status" required className="w-full bg-apyx-bg border border-apyx-border rounded-lg h-12 px-3 text-white focus:outline-none focus:ring-2 focus:ring-apyx-purple/50">
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="space-y-2 flex flex-col justify-center">
            <label className="text-sm font-medium text-white flex items-center gap-2 mt-4 cursor-pointer">
              <input type="checkbox" name="is_featured" value="true" className="w-4 h-4 rounded border-apyx-border bg-apyx-bg text-apyx-purple focus:ring-apyx-purple" />
              <span>Feature this event on the Homepage</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Description</label>
          <Textarea name="description" required placeholder="Describe the event..." className="bg-apyx-bg border-apyx-border min-h-[150px] resize-none" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Location Name</label>
            <Input name="location" required placeholder="Main Campus Hub, Floor 3" className="bg-apyx-bg border-apyx-border h-12" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Cover Image</label>
            <Input name="cover_image_file" type="file" accept="image/*" className="bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer" />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Registration Cap</label>
            <Input name="registration_cap" type="number" placeholder="200" className="bg-apyx-bg border-apyx-border h-12" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Max Team Size</label>
            <Input name="max_team_size" type="number" placeholder="4" className="bg-apyx-bg border-apyx-border h-12" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Devfolio URL</label>
            <Input name="devfolio_url" placeholder="https://apyx.devfolio.co" className="bg-apyx-bg border-apyx-border h-12" />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-apyx-purple hover:bg-apyx-purple/90 text-white min-w-[150px]">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Event"}
          </Button>
        </div>
      </form>
    </div>
  );
}
