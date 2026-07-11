import { User } from "lucide-react";
import { NotFoundState } from "@/components/errors/not-found-state";

export default function TeamMemberNotFound() {
  return (
    <NotFoundState
      title="Team member not found"
      description="This team member may have been removed or the link might be incorrect."
      icon={User}
      backHref="/admin/team"
      backLabel="Back to Team"
      variant="admin"
    />
  );
}
