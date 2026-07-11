import { Megaphone } from "lucide-react";
import { NotFoundState } from "@/components/errors/not-found-state";

export default function AnnouncementNotFound() {
  return (
    <NotFoundState
      title="Announcement not found"
      description="This announcement may have been removed or the link might be incorrect."
      icon={Megaphone}
      backHref="/announcements"
      backLabel="Back to Announcements"
    />
  );
}
