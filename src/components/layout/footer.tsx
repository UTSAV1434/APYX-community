"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Camera,
  MessageCircle,
  ArrowUp,
  ArrowRight,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container, Section } from "@/components/ui/container";

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
    <footer className="relative border-t border-transparent bg-apyx-bg overflow-hidden mt-24">
      {/* Gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-brand opacity-60" />
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-brand opacity-40 blur-md" />

      {/* Main footer content */}
      <Section padding="default">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Column 1: Brand */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-md"
              >
                <Image src="/logo.png" alt="APYX Logo" width={160} height={48} className="w-32 sm:w-40 h-auto object-contain" />
              </Link>
              <p className="mt-6 text-sm text-apyx-text-secondary leading-relaxed max-w-xs">
                A student-led technology ecosystem empowering innovation
                through hackathons, workshops, and real-world projects.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-apyx-text-secondary hover:text-white transition-colors duration-[150ms] outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Events */}
            <div>
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-5">
                Events
              </h3>
              <ul className="space-y-3">
                {eventLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-apyx-text-secondary hover:text-white transition-colors duration-[150ms] outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-5">
                Connect
              </h3>
              <ul className="space-y-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm text-apyx-text-secondary hover:text-white transition-colors duration-[150ms] group outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-sm"
                    >
                      <social.icon className="w-4 h-4 group-hover:text-apyx-purple transition-colors duration-[150ms]" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Stay Updated (Newsletter) */}
            <div>
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-5">
                Stay Updated
              </h3>
              <p className="text-sm text-apyx-text-secondary mb-4 leading-relaxed">
                Never miss an event or announcement.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    disabled={subscribed}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="primary"
                    className="shrink-0 h-11 w-11"
                    disabled={subscribed}
                    aria-label="Subscribe"
                  >
                    {subscribed ? (
                      <span className="text-sm font-medium">✓</span>
                    ) : (
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
                {subscribed ? (
                  <p className="text-xs text-apyx-emerald font-medium" role="status">
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
        </Container>
      </Section>

      {/* Bottom bar */}
      <div className="border-t border-apyx-border bg-apyx-surface/30">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
            <p className="text-xs text-apyx-text-muted">
              © {new Date().getFullYear()} APYX. All rights reserved.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2 text-xs text-apyx-text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apyx-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-apyx-emerald" />
              </span>
              All systems operational
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-apyx-text-muted hover:text-white transition-colors duration-[150ms] outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-sm px-2 py-1"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
              Back to top
            </button>
          </div>
        </Container>
      </div>
    </footer>
  );
}
