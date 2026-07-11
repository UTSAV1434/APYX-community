"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AdminFormLayout } from "@/components/layout/admin-form-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import type { TeamMember } from "@/types/database";
import { formatSkillsForInput } from "@/lib/team-form";

interface TeamMemberFormProps {
  member?: TeamMember;
  title: string;
  description: string;
  submitLabel: string;
  onSubmit: (formData: FormData) => Promise<{ error?: string } | void>;
}

async function uploadTeamPhoto(
  file: File
): Promise<{ url?: string; error?: string }> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `member-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("team")
    .upload(fileName, file);

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("team").getPublicUrl(fileName);

  return { url: publicUrl };
}

export function TeamMemberForm({
  member,
  title,
  description,
  submitLabel,
  onSubmit,
}: TeamMemberFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("is_active", formData.get("is_active") === "on" ? "true" : "false");

    const file = formData.get("profile_file") as File;
    if (file && file.size > 0) {
      const upload = await uploadTeamPhoto(file);
      if (upload.error) {
        setError(`Failed to upload photo: ${upload.error}`);
        setLoading(false);
        return;
      }
      formData.set("photo", upload.url!);
    } else if (member?.photo) {
      formData.set("photo", member.photo);
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
      backLink="/admin/team"
      backText="Back to Team"
      error={error}
      onSubmit={handleSubmit}
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Full Name *</label>
          <Input
            name="name"
            required
            defaultValue={member?.name}
            placeholder="Alex Chen"
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Position *</label>
          <Input
            name="position"
            required
            defaultValue={member?.position}
            placeholder="President"
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Short Bio</label>
        <Textarea
          name="bio"
          defaultValue={member?.bio ?? ""}
          placeholder="Computer Science senior passionate about AI..."
          className="bg-apyx-bg border-apyx-border resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Profile Photo</label>
        {member?.photo && (
          <div className="mb-2">
            <span className="text-xs text-apyx-text-muted block mb-1">
              Current Photo:
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.photo}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover border border-apyx-border"
            />
          </div>
        )}
        <Input
          name="profile_file"
          type="file"
          accept="image/*"
          className="bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-apyx-purple/10 file:text-apyx-purple hover:file:bg-apyx-purple/20"
        />
        {member && (
          <p className="text-xs text-apyx-text-muted">
            Leave blank to keep the current photo.
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Generation *</label>
          <Input
            name="generation"
            required
            defaultValue={member?.generation}
            placeholder="2026-2027"
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Sort Order</label>
          <Input
            name="sort_order"
            type="number"
            min={0}
            defaultValue={member?.sort_order ?? 0}
            className="bg-apyx-bg border-apyx-border h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          Skills (comma separated)
        </label>
        <Input
          name="skills"
          defaultValue={formatSkillsForInput(member?.skills)}
          placeholder="React, Node.js, AI"
          className="bg-apyx-bg border-apyx-border h-12"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-apyx-border mt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">LinkedIn URL</label>
          <Input
            name="linkedin"
            type="url"
            defaultValue={member?.linkedin ?? ""}
            placeholder="https://linkedin.com/in/..."
            className="bg-apyx-bg border-apyx-border h-10"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">GitHub URL</label>
          <Input
            name="github"
            type="url"
            defaultValue={member?.github ?? ""}
            placeholder="https://github.com/..."
            className="bg-apyx-bg border-apyx-border h-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-apyx-border mt-4">
        <input
          id="is_active"
          name="is_active"
          type="checkbox"
          defaultChecked={member?.is_active ?? true}
          className="h-4 w-4 rounded border-apyx-border bg-apyx-bg text-apyx-purple focus:ring-apyx-purple"
        />
        <label htmlFor="is_active" className="text-sm font-medium text-white">
          Show on public team page
        </label>
      </div>

      <div className="pt-6 flex justify-end">
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
