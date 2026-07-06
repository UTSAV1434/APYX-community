import { Metadata } from "next";
import { Users, Calendar, Megaphone, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard Overview",
};

const stats = [
  { label: "Total Events", value: "24", icon: Calendar, color: "text-apyx-purple" },
  { label: "Active Members", value: "530", icon: Users, color: "text-apyx-cyan" },
  { label: "Announcements", value: "12", icon: Megaphone, color: "text-apyx-emerald" },
  { label: "Website Visits", value: "12.4k", icon: Activity, color: "text-apyx-blue" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-white mb-2">Overview</h1>
        <p className="text-apyx-text-secondary">Welcome back! Here is what&apos;s happening across APYX today.</p>
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
        {/* Recent Events Placeholder */}
        <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-6">
          <h2 className="text-lg font-bold font-heading text-white mb-6 border-b border-apyx-border pb-4">Recent Events</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white text-sm">APYX Hackathon 2026</p>
                <p className="text-xs text-apyx-text-muted">August 15, 2026</p>
              </div>
              <span className="px-2 py-1 bg-apyx-purple/10 text-apyx-purple text-[10px] font-bold uppercase rounded-md border border-apyx-purple/20">Upcoming</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white text-sm">Intro to AI Agents</p>
                <p className="text-xs text-apyx-text-muted">July 20, 2026</p>
              </div>
              <span className="px-2 py-1 bg-apyx-purple/10 text-apyx-purple text-[10px] font-bold uppercase rounded-md border border-apyx-purple/20">Upcoming</span>
            </div>
            <div className="flex items-center justify-between opacity-60">
              <div>
                <p className="font-medium text-white text-sm">Web3 Developer Meetup</p>
                <p className="text-xs text-apyx-text-muted">June 10, 2026</p>
              </div>
              <span className="px-2 py-1 bg-white/5 text-apyx-text-secondary text-[10px] font-bold uppercase rounded-md border border-white/10">Past</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Placeholder */}
        <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-6">
          <h2 className="text-lg font-bold font-heading text-white mb-6 border-b border-apyx-border pb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-apyx-bg border border-apyx-border rounded-lg text-sm text-apyx-text-secondary hover:text-white hover:border-apyx-purple/50 transition-colors">
              + Create New Event
            </button>
            <button className="w-full text-left px-4 py-3 bg-apyx-bg border border-apyx-border rounded-lg text-sm text-apyx-text-secondary hover:text-white hover:border-apyx-cyan/50 transition-colors">
              + Post Announcement
            </button>
            <button className="w-full text-left px-4 py-3 bg-apyx-bg border border-apyx-border rounded-lg text-sm text-apyx-text-secondary hover:text-white hover:border-apyx-emerald/50 transition-colors">
              + Upload to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
