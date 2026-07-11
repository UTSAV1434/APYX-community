"use client";

import { updateEvent } from "@/app/actions/events";
import { EventForm } from "@/components/admin/event-form";
import type { Event } from "@/types/database";

interface EditEventFormProps {
  event: Event;
}

export function EditEventForm({ event }: EditEventFormProps) {
  return (
    <EventForm
      event={event}
      title="Edit Event"
      description={`Update details for ${event.title}`}
      submitLabel="Save Changes"
      onSubmit={(formData) => updateEvent(event.id, formData)}
    />
  );
}
