"use client";

import { useState } from "react";
import { createTeamMember } from "@/app/actions/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NewTeamMemberPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const file = formData.get("profile_file") as File;
    
    // Default is_active to true
    formData.set("is_active", "true");

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `member-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('team')
        .upload(fileName, file);

      if (uploadError) {
        setError(`Failed to upload photo: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('team')
        .getPublicUrl(fileName);
        
      formData.set("photo", publicUrl);
    }

    const result = await createTeamMember(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/team" className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Team
        </Link>
        <h1 className="text-3xl font-bold font-heading text-white mb-2">Add Team Member</h1>
        <p className="text-apyx-text-secondary">Add a new core team member to be displayed on the About page.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-apyx-surface border border-apyx-border rounded-3xl p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Full Name *</label>
            <Input name="name" required placeholder="Alex Chen" className="bg-apyx-bg border-apyx-border h-12" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Position *</label>
            <Input name="position" required placeholder="President" className="bg-apyx-bg border-apyx-border h-12" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Short Bio</label>
          <Textarea name="bio" placeholder="Computer Science senior passionate about AI..." className="bg-apyx-bg border-apyx-border resize-none" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Profile Photo</label>
          <Input name="profile_file" type="file" accept="image/*" className="bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-apyx-purple/10 file:text-apyx-purple hover:file:bg-apyx-purple/20" />
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Generation *</label>
            <Input name="generation" required placeholder="2026-2027" className="bg-apyx-bg border-apyx-border h-12" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Sort Order</label>
            <Input name="sort_order" type="number" defaultValue="0" className="bg-apyx-bg border-apyx-border h-12" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Skills (comma separated)</label>
          <Input name="skills" placeholder="React, Node.js, AI" className="bg-apyx-bg border-apyx-border h-12" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-apyx-border mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">LinkedIn URL</label>
            <Input name="linkedin" placeholder="https://linkedin.com/in/..." className="bg-apyx-bg border-apyx-border h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">GitHub URL</label>
            <Input name="github" placeholder="https://github.com/..." className="bg-apyx-bg border-apyx-border h-10" />
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-apyx-purple hover:bg-apyx-purple/90 text-white min-w-[150px]">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Member"}
          </Button>
        </div>
      </form>
    </div>
  );
}
