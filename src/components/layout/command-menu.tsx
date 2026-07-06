"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Calendar, 
  Megaphone, 
  FileText, 
  Users, 
  Building2,
  ArrowRight,
  Home,
  Image as ImageIcon,
  Mail
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { createClient } from "@/lib/supabase/client";

// Dummy data for search (simulating Fuse.js results for now)
const searchData = {
  events: [
    { id: "e1", title: "APYX Hackathon 2026", url: "/events/apyx-hackathon-2026" },
    { id: "e2", title: "Intro to AI Agents", url: "/events/intro-ai-agents" },
    { id: "e3", title: "Web3 Developer Meetup", url: "/events/web3-meetup" },
  ],
  announcements: [
    { id: "a1", title: "Registration is Open", url: "/announcements/hackathon-2026-registration" },
    { id: "a2", title: "Devfolio Partnership", url: "/announcements/devfolio-partnership" },
  ],
  pages: [
    { id: "p0", title: "Home", url: "/", icon: Home },
    { id: "p1", title: "About APYX", url: "/about", icon: Users },
    { id: "p2", title: "Events Calendar", url: "/events", icon: Calendar },
    { id: "p3", title: "Announcements", url: "/announcements", icon: Megaphone },
    { id: "p4", title: "Event Gallery", url: "/gallery", icon: ImageIcon },
    { id: "p6", title: "Our Team", url: "/team", icon: Users },
    { id: "p8", title: "Contact Us", url: "/contact", icon: Mail },
  ]
};

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const supabase = createClient();
  const [events, setEvents] = useState<{ id: string; title: string; url: string }[]>([]);
  const [announcements, setAnnouncements] = useState<{ id: string; title: string; url: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [eventsRes, announcementsRes] = await Promise.all([
        supabase.from("events").select("id, title, slug").limit(10),
        supabase.from("announcements").select("id, title, slug").limit(10),
      ]);

      if (eventsRes.data) {
        setEvents(eventsRes.data.map(e => ({ id: e.id, title: e.title, url: `/events/${e.slug}` })));
      }
      if (announcementsRes.data) {
        setAnnouncements(announcementsRes.data.map(a => ({ id: a.id, title: a.title, url: `/announcements/${a.slug}` })));
      }
    }
    fetchData();

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleCustomEvent = () => {
      setOpen(true);
    };

    document.addEventListener("keydown", down);
    window.addEventListener("open-search", handleCustomEvent);
    
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-search", handleCustomEvent);
    };
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search events, announcements, or pages..." />
      <CommandList className="no-scrollbar">
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Pages">
          {searchData.pages.map((page) => (
            <CommandItem
              key={page.id}
              value={page.title}
              onSelect={() => runCommand(() => router.push(page.url))}
            >
              <page.icon className="mr-2 h-4 w-4 text-apyx-purple" />
              <span>{page.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Events">
          {events.map((event) => (
            <CommandItem
              key={event.id}
              value={event.title}
              onSelect={() => runCommand(() => router.push(event.url))}
            >
              <Calendar className="mr-2 h-4 w-4 text-apyx-cyan" />
              <span>{event.title}</span>
              <ArrowRight className="ml-auto h-3 w-3 opacity-50" />
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Announcements">
          {announcements.map((announcement) => (
            <CommandItem
              key={announcement.id}
              value={announcement.title}
              onSelect={() => runCommand(() => router.push(announcement.url))}
            >
              <Megaphone className="mr-2 h-4 w-4 text-apyx-emerald" />
              <span>{announcement.title}</span>
              <ArrowRight className="ml-auto h-3 w-3 opacity-50" />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
