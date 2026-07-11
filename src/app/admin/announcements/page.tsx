import { Metadata } from "next";
import { Plus, Search, Edit2, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { deleteAnnouncement, getAnnouncements } from "@/app/actions/announcements";
import { AdminTable } from "@/components/ui/admin-table";

export const metadata: Metadata = {
  title: "Manage Announcements | Admin",
};

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white mb-2">Announcements Manager</h1>
          <p className="text-apyx-text-secondary">Publish updates and news to the community feed.</p>
        </div>
        <Link href="/admin/announcements/new">
          <Button className="bg-apyx-purple hover:bg-apyx-purple/90 text-white gap-2">
            <Plus className="w-4 h-4" />
            New Announcement
          </Button>
        </Link>
      </div>

      <AdminTable
        toolbar={
          <div className="p-4 border-b border-apyx-border flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apyx-text-muted" />
              <Input 
                placeholder="Search announcements..." 
                className="pl-9 bg-apyx-bg border-apyx-border h-10"
              />
            </div>
          </div>
        }
        columns={[
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "published_at", label: "Published Date" },
          { key: "status", label: "Status" },
          { key: "actions", label: "Actions", align: "right" },
        ]}
        data={announcements || []}
        keyExtractor={(item) => item.id}
        emptyMessage="No announcements found. Publish your first update!"
        renderRow={(item) => (
          <>
            <td className="px-6 py-4 font-medium text-white">{item.title}</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase border bg-white/5 text-apyx-text-secondary border-white/10">
                {item.category.replace('_', ' ')}
              </span>
            </td>
            <td className="px-6 py-4">{new Date(item.published_at).toLocaleDateString()}</td>
            <td className="px-6 py-4">
              {item.is_pinned && <span className="text-apyx-cyan text-xs">Pinned</span>}
            </td>
            <td className="px-6 py-4 text-right space-x-2">
              <form action={async () => {
                "use server";
                await deleteAnnouncement(item.id);
              }} className="inline-block">
                <button type="submit" className="p-2 text-apyx-text-muted hover:text-red-500 transition-colors" title="Delete Announcement">
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
