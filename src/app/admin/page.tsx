import { Metadata } from "next";
import { Users, Calendar, Megaphone, Activity, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Admin Dashboard Overview",
};
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts
  const [{ count: eventsCount }, { count: membersCount }, { count: announcementsCount }] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("team_members").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("announcements").select("*", { count: "exact", head: true }),
  ]);

  // Fetch recent events
  const { data: recentEvents } = await supabase
    .from("events")
    .select("id, title, start_date, status")
    .order("created_at", { ascending: false })
    .limit(3);

  const stats = [
    { label: "Total Events", value: eventsCount?.toString() || "0", icon: Calendar, color: "text-apyx-purple" },
    { label: "Active Members", value: membersCount?.toString() || "0", icon: Users, color: "text-apyx-cyan" },
    { label: "Announcements", value: announcementsCount?.toString() || "0", icon: Megaphone, color: "text-apyx-emerald" },
    { label: "Website Visits", value: "12.4k", icon: Activity, color: "text-apyx-blue" }, // Hardcoded for now
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white mb-2">Overview</h1>
          <p className="text-apyx-text-secondary">Welcome back! Here is what&apos;s happening across APYX today.</p>
        </div>
        <Link href="/" className="inline-flex items-center justify-center h-10 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors">
          <Globe className="w-4 h-4 mr-2" />
          Go Back to Site
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-apyx-surface border border-apyx-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-apyx-text-secondary">{stat.label}</span>
              <div className={`w-10 h-10 rounded-lg bg-apyx-bg border border-apyx-border flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-mono text-white">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-apyx-border pb-4 mb-6">
            <h2 className="text-lg font-bold font-heading text-white">Recent Events</h2>
            <Link href="/admin/events" className="text-sm text-apyx-purple hover:text-white transition-colors">View All</Link>
          </div>
          <div className="space-y-4">
            {!recentEvents || recentEvents.length === 0 ? (
              <p className="text-sm text-apyx-text-muted">No events created yet.</p>
            ) : (
              recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white text-sm">{event.title}</p>
                    <p className="text-xs text-apyx-text-muted">
                      {event.start_date ? format(new Date(event.start_date), "MMMM d, yyyy") : "TBA"}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md border ${
                    event.status === 'upcoming' ? 'bg-apyx-purple/10 text-apyx-purple border-apyx-purple/20' :
                    event.status === 'ongoing' ? 'bg-apyx-cyan/10 text-apyx-cyan border-apyx-cyan/20' :
                    'bg-white/5 text-apyx-text-secondary border-white/10'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-6">
          <h2 className="text-lg font-bold font-heading text-white mb-6 border-b border-apyx-border pb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/events/new" className="block w-full text-left px-4 py-3 bg-apyx-bg border border-apyx-border rounded-lg text-sm text-apyx-text-secondary hover:text-white hover:border-apyx-purple/50 transition-colors">
              + Create New Event
            </Link>
            <Link href="/admin/announcements/new" className="block w-full text-left px-4 py-3 bg-apyx-bg border border-apyx-border rounded-lg text-sm text-apyx-text-secondary hover:text-white hover:border-apyx-cyan/50 transition-colors">
              + Post Announcement
            </Link>
            <Link href="/admin/gallery" className="block w-full text-left px-4 py-3 bg-apyx-bg border border-apyx-border rounded-lg text-sm text-apyx-text-secondary hover:text-white hover:border-apyx-emerald/50 transition-colors">
              + Upload to Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
