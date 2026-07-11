import { notFound } from "next/navigation";
import { getEventById } from "@/app/actions/events";
import { EditEventForm } from "./edit-form";

type EditEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return <EditEventForm event={event} />;
}
