"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Menu,
  Briefcase,
  Camera,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet";
import { transitionSpring } from "@/lib/motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Announcements", href: "/announcements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Briefcase, href: "https://www.linkedin.com/company/apyxcommunity/", label: "LinkedIn" },
  { icon: Camera, href: "https://www.instagram.com/official.apyx?igsh=cXdwcHFyejJ5bGl1", label: "Instagram" },
  { icon: MessageCircle, href: "https://x.com/official_apyx", label: "Twitter/X" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  // Don't render navbar on admin pages
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[350ms] ${
        scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-apyx-border/50 shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-apyx-purple focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>

      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-md"
        >
          <Image src="/logo.png" alt="APYX Logo" width={128} height={38} className="w-24 sm:w-32 h-auto object-contain" priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-[150ms] rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple ${
                isActive(link.href)
                  ? "text-white"
                  : "text-apyx-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-brand rounded-full"
                  transition={transitionSpring}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right section: Search + CTA */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-apyx-text-muted hover:text-white transition-colors duration-[150ms] rounded-lg hover:bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-search"));
            }}
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-white/5 rounded border border-apyx-border text-apyx-text-secondary">
              Ctrl+K
            </kbd>
          </button>

          {/* Join APYX CTA — desktop only */}
          <Button
            asChild
            size="sm"
            variant="primary"
            className="hidden lg:inline-flex"
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              Join APYX
              <ExternalLink className="w-3 h-3 ml-1.5" aria-hidden="true" />
            </a>
          </Button>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="p-2 text-apyx-text-secondary hover:text-white transition-colors duration-[150ms] rounded-lg hover:bg-white/5 inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col p-0">
                <SheetHeader className="px-6 py-5 border-b border-apyx-border flex-row items-center justify-between">
                  <Link href="/" onClick={() => setMobileOpen(false)} className="outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-md">
                    <Image src="/logo.png" alt="APYX Logo" width={112} height={34} className="w-28 h-auto object-contain" />
                  </Link>
                </SheetHeader>

                {/* Search in mobile */}
                <button
                  className="flex items-center gap-3 mx-6 mt-6 px-4 py-3 text-sm text-apyx-text-muted bg-apyx-surface rounded-xl border border-apyx-border hover:border-apyx-purple/50 transition-colors duration-[150ms] outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple"
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("open-search"));
                    }, 300);
                  }}
                >
                  <Search className="w-4 h-4" />
                  Search APYX...
                </button>

                {/* Mobile nav links */}
                <nav className="flex-1 py-4 overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center px-6 py-3.5 text-base font-medium transition-colors duration-[150ms] outline-none focus-visible:bg-white/5 ${
                        isActive(link.href)
                          ? "text-white bg-apyx-surface border-l-2 border-apyx-purple"
                          : "text-apyx-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <SheetFooter className="mt-auto px-6 py-6 border-t border-apyx-border flex flex-col gap-4">
                  <div className="flex items-center gap-3 justify-center">
                    {socialLinks.map((social) => (
                      <a
                         key={social.label}
                         href={social.href}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="p-2.5 text-apyx-text-muted hover:text-white transition-colors duration-[150ms] rounded-xl bg-apyx-surface border border-apyx-border hover:border-apyx-purple/50 outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple"
                         aria-label={social.label}
                       >
                         <social.icon className="w-5 h-5" />
                       </a>
                    ))}
                  </div>

                  <Button
                    asChild
                    variant="primary"
                    size="lg"
                    className="mt-4"
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Join APYX
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
                    </a>
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
