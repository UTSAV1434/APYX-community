"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { 
  Rocket, 
  Ticket, 
  Mic2, 
  RefreshCcw, 
  Image as ImageIcon, 
  FileText 
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { createClient } from "@/lib/supabase/client";

import type { ActivityAction, ActivityLogEntry } from "@/types/database";

const actionIcons: Record<ActivityAction | "default", React.ReactNode> = {
  registration_opened: <Ticket className="w-4 h-4 text-apyx-emerald" />,
  announcement_published: <Mic2 className="w-4 h-4 text-apyx-purple" />,
  event_created: <Rocket className="w-4 h-4 text-apyx-cyan" />,
  event_updated: <RefreshCcw className="w-4 h-4 text-apyx-cyan" />,
  gallery_uploaded: <ImageIcon className="w-4 h-4 text-apyx-rose" />,
  resource_added: <FileText className="w-4 h-4 text-apyx-text-muted" />,
  default: <RefreshCcw className="w-4 h-4 text-apyx-text-muted" />,
};

function isActivityLogEntry(value: unknown): value is ActivityLogEntry {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "action" in value &&
    "summary" in value &&
    "created_at" in value
  );
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);
  const supabase = createClient();

  // Fetch initial activities and subscribe to changes
  useEffect(() => {
    // 1. Fetch the latest 5 activities
    async function fetchActivities() {
      const { data } = await supabase
        .from("activity_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (data) {
        setActivities(data);
      }
    }
    fetchActivities();

    const channel = supabase
      .channel("public:activity_log")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "activity_log" },
        (payload) => {
          const entry = payload.new;
          if (isActivityLogEntry(entry)) {
            setActivities((current) => [entry, ...current].slice(0, 5));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <ScrollReveal direction="left" className="h-full">
      <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
        {/* Subtle gradient corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-apyx-purple/10 blur-3xl rounded-full" />
        
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-apyx-emerald animate-pulse" />
          <h3 className="text-lg font-bold font-heading text-white">Live Activity</h3>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-apyx-border via-apyx-border/50 to-transparent" />
          
          <ul className="space-y-6 relative z-10">
            {activities.length === 0 ? (
              <p className="text-sm text-apyx-text-muted pl-12 pt-2">No recent activity.</p>
            ) : (
              <AnimatePresence initial={false}>
                {activities.map((activity) => (
                  <motion.li
                    key={activity.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-4"
                  >
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-apyx-bg border border-apyx-border flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10">
                      {actionIcons[activity.action] ?? actionIcons.default}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-white font-medium line-clamp-2">
                        {activity.summary}
                      </p>
                      <time className="text-xs text-apyx-text-muted mt-1">
                        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                      </time>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            )}
          </ul>
        </div>
      </div>
    </ScrollReveal>
  );
}
