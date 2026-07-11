import { Metadata } from "next";
import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { deleteEvent, getEvents } from "@/app/actions/events";
import { AdminTable } from "@/components/ui/admin-table";

export const metadata: Metadata = {
  title: "Manage Events | Admin",
};

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white mb-2">Events Manager</h1>
          <p className="text-apyx-text-secondary">Create, update, and manage APYX events.</p>
        </div>
        <Link href="/admin/events/new">
          <Button className="bg-apyx-purple hover:bg-apyx-purple/90 text-white gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </Link>
      </div>

      <AdminTable
        toolbar={
          <div className="p-4 border-b border-apyx-border flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apyx-text-muted" />
              <Input 
                placeholder="Search events..." 
                className="pl-9 bg-apyx-bg border-apyx-border h-10"
              />
            </div>
          </div>
        }
        columns={[
          { key: "name", label: "Event Name" },
          { key: "start_date", label: "Start Date" },
          { key: "type", label: "Type" },
          { key: "status", label: "Status" },
          { key: "actions", label: "Actions", align: "right" },
        ]}
        data={events || []}
        keyExtractor={(event) => event.id}
        emptyMessage="No events found. Create your first event!"
        renderRow={(event) => (
          <>
            <td className="px-6 py-4 font-medium text-white">{event.title}</td>
            <td className="px-6 py-4">{new Date(event.start_date).toLocaleDateString()}</td>
            <td className="px-6 py-4 capitalize">{event.type}</td>
            <td className="px-6 py-4">
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${
                event.status === 'upcoming' 
                  ? 'bg-apyx-purple/10 text-apyx-purple border-apyx-purple/20' 
                  : 'bg-white/5 text-apyx-text-secondary border-white/10'
              }`}>
                {event.status}
              </span>
            </td>
            <td className="px-6 py-4 text-right space-x-2">
              <Link href={`/events/${event.slug}`} target="_blank" className="inline-flex p-2 text-apyx-text-muted hover:text-apyx-cyan transition-colors" title="View Public Page">
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link href={`/admin/events/${event.id}/edit`} className="inline-flex p-2 text-apyx-text-muted hover:text-apyx-purple transition-colors" title="Edit Event">
                <Edit2 className="w-4 h-4" />
              </Link>
              
              <form action={async () => {
                "use server";
                await deleteEvent(event.id);
              }} className="inline-block">
                <button type="submit" className="p-2 text-apyx-text-muted hover:text-red-500 transition-colors" title="Delete Event">
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
