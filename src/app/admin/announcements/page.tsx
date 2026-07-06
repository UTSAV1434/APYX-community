import { Metadata } from "next";
import { Plus, Search, Edit2, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { deleteAnnouncement, getAnnouncements } from "@/app/actions/announcements";

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

      <div className="bg-apyx-surface border border-apyx-border rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-apyx-border flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apyx-text-muted" />
            <Input 
              placeholder="Search announcements..." 
              className="pl-9 bg-apyx-bg border-apyx-border h-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-apyx-text-secondary">
            <thead className="bg-apyx-bg border-b border-apyx-border text-xs uppercase font-semibold text-white">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Published Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apyx-border">
              {!announcements || announcements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-apyx-text-muted">
                    No announcements found. Publish your first update!
                  </td>
                </tr>
              ) : (
                announcements.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
