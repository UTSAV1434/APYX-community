import { Metadata } from "next";
import { Plus, Trash2, User, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteTeamMember } from "@/app/actions/team";
import { AdminTable } from "@/components/ui/admin-table";

export const metadata: Metadata = {
  title: "Manage Team | Admin",
};

export default async function AdminTeamPage() {
  const supabase = await createClient();
  
  const { data: teamMembers, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("generation", { ascending: false });

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white mb-2">Team Management</h1>
          <p className="text-apyx-text-secondary">Manage core team members displayed on the public About page.</p>
        </div>
        <Link href="/admin/team/new">
          <Button className="bg-apyx-purple hover:bg-apyx-purple/90 text-white gap-2">
            <Plus className="w-4 h-4" />
            Add Member
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          Failed to load team members: {error.message}
        </div>
      )}

      <AdminTable
        columns={[
          { key: "member", label: "Member" },
          { key: "position", label: "Position" },
          { key: "generation", label: "Generation" },
          { key: "socials", label: "Socials" },
          { key: "actions", label: "Actions", align: "right" },
        ]}
        data={teamMembers || []}
        keyExtractor={(member) => member.id}
        emptyMessage="No team members found. Click 'Add Member' to create one."
        renderRow={(member) => (
          <>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photo} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-apyx-bg border border-apyx-border flex items-center justify-center text-apyx-text-muted">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-white text-base">{member.name}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="inline-flex px-2 py-1 rounded bg-apyx-purple/10 text-apyx-purple border border-apyx-purple/20 text-xs font-semibold">
                {member.position}
              </span>
            </td>
            <td className="px-6 py-4">
              {member.generation}
            </td>
            <td className="px-6 py-4 text-xs">
              <div className="flex flex-col gap-1">
                {member.linkedin && <a href={member.linkedin} target="_blank" className="hover:text-apyx-blue">LinkedIn</a>}
                {member.github && <a href={member.github} target="_blank" className="hover:text-white">GitHub</a>}
              </div>
            </td>
            <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
              <Link href={`/admin/team/${member.id}/edit`} className="p-2 text-apyx-text-muted hover:text-white transition-colors" title="Edit Member">
                <Edit2 className="w-4 h-4" />
              </Link>
              <form action={async () => {
                "use server";
                await deleteTeamMember(member.id);
              }}>
                <button type="submit" className="p-2 text-apyx-text-muted hover:text-red-500 transition-colors" title="Delete Member">
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </td>
          </>
        )}
      />
    </div>
  );
}
