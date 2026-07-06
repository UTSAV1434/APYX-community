"use client";

import { useState, useEffect, use } from "react";
import { updateTeamMember } from "@/app/actions/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [member, setMember] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMember() {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();
        
      if (error) {
        setError("Failed to load member details.");
      } else {
        setMember(data);
      }
    }
    fetchMember();
  }, [resolvedParams.id, supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const file = formData.get("profile_file") as File;

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `member-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('team')
        .upload(fileName, file);

      if (uploadError) {
        setError(`Failed to upload new photo: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('team')
        .getPublicUrl(fileName);
        
      formData.set("image_url", publicUrl);
    }

    const result = await updateTeamMember(resolvedParams.id, formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  if (!member && !error) {
    return <div className="p-10 text-white">Loading member details...</div>;
  }

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/team" className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Team
        </Link>
        <h1 className="text-3xl font-bold font-heading text-white mb-2">Edit Team Member</h1>
        <p className="text-apyx-text-secondary">Update details for {member?.name}</p>
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
            <Input name="name" required defaultValue={member?.name} className="bg-apyx-bg border-apyx-border h-12" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Role *</label>
            <Input name="role" required defaultValue={member?.role} className="bg-apyx-bg border-apyx-border h-12" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Short Bio</label>
          <Textarea name="bio" defaultValue={member?.bio} className="bg-apyx-bg border-apyx-border resize-none" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Profile Photo</label>
          {member?.image_url && (
            <div className="mb-2">
              <span className="text-xs text-apyx-text-muted block mb-1">Current Photo:</span>
              <img src={member.image_url} alt="Current profile" className="w-16 h-16 rounded-full object-cover border border-apyx-border" />
            </div>
          )}
          <Input name="profile_file" type="file" accept="image/*" className="bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-apyx-purple/10 file:text-apyx-purple hover:file:bg-apyx-purple/20" />
          <p className="text-xs text-apyx-text-muted">Leave blank to keep the current photo.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-apyx-border mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Twitter URL</label>
            <Input name="twitter_url" defaultValue={member?.twitter_url} className="bg-apyx-bg border-apyx-border h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">LinkedIn URL</label>
            <Input name="linkedin_url" defaultValue={member?.linkedin_url} className="bg-apyx-bg border-apyx-border h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">GitHub URL</label>
            <Input name="github_url" defaultValue={member?.github_url} className="bg-apyx-bg border-apyx-border h-10" />
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-apyx-purple hover:bg-apyx-purple/90 text-white min-w-[150px]">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
