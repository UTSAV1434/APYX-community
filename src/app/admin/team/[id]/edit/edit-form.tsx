"use client";

import { updateTeamMember } from "@/app/actions/team";
import { TeamMemberForm } from "@/components/admin/team-member-form";
import type { TeamMember } from "@/types/database";

interface EditTeamMemberFormProps {
  member: TeamMember;
}

export function EditTeamMemberForm({ member }: EditTeamMemberFormProps) {
  return (
    <TeamMemberForm
      member={member}
      title="Edit Team Member"
      description={`Update details for ${member.name}`}
      submitLabel="Save Changes"
      onSubmit={(formData) => updateTeamMember(member.id, formData)}
    />
  );
}
