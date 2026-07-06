"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Code,
  Briefcase,
  Camera,
  MessageCircle,
  PlaySquare,
  ArrowUp,
  Mail,
  ArrowRight,
  Circle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
  { label: "Admin Login", href: "/admin" },
];

const eventLinks = [
  { label: "Upcoming Events", href: "/events?status=upcoming" },
  { label: "Past Events", href: "/events?status=past" },
  { label: "Calendar View", href: "/events?view=calendar" },
];

const socialLinks = [
  { icon: Briefcase, href: "https://www.linkedin.com/company/apyxcommunity/", label: "LinkedIn" },
  { icon: Camera, href: "https://www.instagram.com/official.apyx?igsh=cXdwcHFyejJ5bGl1", label: "Instagram" },
  { icon: MessageCircle, href: "https://x.com/official_apyx", label: "Twitter/X" },
  { icon: Phone, href: "https://chat.whatsapp.com/I32ntrKuJTzHlCbUZ6jQT0", label: "WhatsApp" },
];

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Don't render footer on admin pages
  if (pathname?.startsWith("/admin")) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // TODO: Wire to Supabase newsletter_subscribers
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-transparent">
      {/* Gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B026FF] to-transparent opacity-60" />
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-[#B026FF] via-[#2F7BFF] to-[#14C8FF] opacity-40 blur-sm" />

      <div className="bg-apyx-bg-alt">
        {/* Main footer content */}
        <div className="container-wide section-padding-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Column 1: Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 group">
                <Image src="/logo.png" alt="APYX Logo" width={240} height={72} className="w-32 sm:w-40 h-auto object-contain" />
              </Link>
              <p className="mt-4 text-sm text-apyx-text-secondary leading-relaxed max-w-xs">
                A student-led technology ecosystem empowering innovation
                through hackathons, workshops, and real-world projects.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-apyx-text-secondary hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Events */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Events
              </h3>
              <ul className="space-y-2.5">
                {eventLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-apyx-text-secondary hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Connect
              </h3>
              <ul className="space-y-2.5">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-apyx-text-secondary hover:text-white transition-colors duration-200 group"
                    >
                      <social.icon className="w-4 h-4 group-hover:text-apyx-purple transition-colors" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Stay Updated (Newsletter) */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Stay Updated
              </h3>
              <p className="text-sm text-apyx-text-secondary mb-3">
                Never miss an event or announcement.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-apyx-surface border-apyx-border text-white placeholder:text-apyx-text-muted text-sm h-9 focus:border-apyx-purple"
                    disabled={subscribed}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-9 w-9 shrink-0 bg-gradient-brand hover:opacity-90 border-0"
                    disabled={subscribed}
                  >
                    {subscribed ? (
                      <span className="text-xs">✓</span>
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {subscribed ? (
                  <p className="text-xs text-apyx-emerald">
                    You&apos;re in! 🎉
                  </p>
                ) : (
                  <p className="text-xs text-apyx-text-muted">
                    No spam, unsubscribe anytime.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-apyx-border">
          <div className="container-wide flex flex-col sm:flex-row items-center justify-between py-4 gap-3">
            <p className="text-xs text-apyx-text-muted">
              © {new Date().getFullYear()} APYX. All rights reserved.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-1.5 text-xs text-apyx-text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apyx-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-apyx-emerald" />
              </span>
              All systems operational
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-xs text-apyx-text-muted hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3 h-3" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
