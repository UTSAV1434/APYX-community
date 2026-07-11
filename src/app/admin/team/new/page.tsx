"use client";

import { createTeamMember } from "@/app/actions/team";
import { TeamMemberForm } from "@/components/admin/team-member-form";

export default function NewTeamMemberPage() {
  return (
    <TeamMemberForm
      title="Add Team Member"
      description="Add a new core team member to be displayed on the public team page."
      submitLabel="Add Member"
      onSubmit={createTeamMember}
    />
  );
}
