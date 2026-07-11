import { notFound } from "next/navigation";
import { getTeamMemberById } from "@/app/actions/team";
import { EditTeamMemberForm } from "./edit-form";

type EditTeamMemberPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTeamMemberPage({
  params,
}: EditTeamMemberPageProps) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    notFound();
  }

  return <EditTeamMemberForm member={member} />;
}
