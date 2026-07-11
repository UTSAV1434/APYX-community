"use client";

import { createEvent } from "@/app/actions/events";
import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  return (
    <EventForm
      title="Create New Event"
      description="Publish a new hackathon, workshop, or meetup to the platform."
      submitLabel="Publish Event"
      onSubmit={createEvent}
    />
  );
}
