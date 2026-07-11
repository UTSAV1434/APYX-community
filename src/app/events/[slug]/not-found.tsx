import { Calendar } from "lucide-react";
import { NotFoundState } from "@/components/errors/not-found-state";

export default function EventNotFound() {
  return (
    <NotFoundState
      title="Event not found"
      description="This event may have been removed or the link might be incorrect."
      icon={Calendar}
      backHref="/events"
      backLabel="Back to Events"
    />
  );
}
