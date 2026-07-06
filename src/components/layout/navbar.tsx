"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  Code,
  Briefcase,
  Camera,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-apyx-purple focus:text-white focus:rounded-lg"
      >
        Skip to content
      </a>

      <nav className="container-wide flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <Image src="/logo.png" alt="APYX Logo" width={200} height={60} className="w-24 sm:w-32 h-auto object-contain" priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:text-white ${
                isActive(link.href)
                  ? "text-white"
                  : "text-apyx-text-secondary hover:bg-white/5"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#B026FF] to-[#14C8FF] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right section: Search + CTA */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-apyx-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
            onClick={() => {
              // Will dispatch to global search overlay
              window.dispatchEvent(new CustomEvent("open-search"));
            }}
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white/5 rounded border border-white/10">
              Ctrl+K
            </kbd>
          </button>

          {/* Join APYX CTA — desktop only */}
          <Button
            render={<a href="#" target="_blank" rel="noopener noreferrer" />}
            size="sm"
            className="hidden lg:inline-flex bg-gradient-brand hover:opacity-90 transition-opacity text-white border-0 shadow-lg shadow-purple-500/20"
          >
            Join APYX
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="lg:hidden p-2 text-apyx-text-secondary hover:text-white transition-colors rounded-md hover:bg-white/5 inline-flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-80 bg-apyx-bg border-apyx-border p-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="flex items-center justify-between p-4 border-b border-apyx-border">
                  <Link href="/" onClick={() => setMobileOpen(false)}>
                    <Image src="/logo.png" alt="APYX Logo" width={160} height={48} className="w-24 h-auto object-contain" />
                  </Link>
                </div>

                {/* Search in mobile */}
                <button
                  className="flex items-center gap-2 mx-4 mt-4 px-3 py-2.5 text-sm text-apyx-text-muted bg-apyx-surface rounded-lg border border-apyx-border hover:border-apyx-purple/50 transition-colors"
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
                <nav className="flex-1 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center px-6 py-3 text-base font-medium transition-colors ${
                        isActive(link.href)
                          ? "text-white bg-apyx-surface border-l-2 border-apyx-purple"
                          : "text-apyx-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile footer */}
                <div className="p-4 border-t border-apyx-border space-y-4">
                  {/* Social icons */}
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-apyx-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>

                  {/* Join CTA */}
                  <Button
                    render={<a href="#" target="_blank" rel="noopener noreferrer" />}
                    className="w-full bg-gradient-brand hover:opacity-90 text-white border-0"
                  >
                    Join APYX
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
