"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Megaphone, 
  Image as ImageIcon,
  Users,
  LogOut,
  Menu,
  Mail,
  X,
  Globe
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

const adminLinks = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Team", href: "/admin/team", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // We don't render the sidebar on the login page itself
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-apyx-bg flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-apyx-border bg-apyx-surface fixed inset-y-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-apyx-border">
          <Link href="/" className="text-xl font-bold font-heading text-gradient">
                        APYX Admin
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-apyx-purple/10 text-apyx-purple"
                    : "text-apyx-text-secondary hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-apyx-border space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-apyx-text-secondary hover:bg-white/5 hover:text-white transition-colors"
          >
            <Globe className="w-5 h-5" />
            Back to Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-apyx-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header & Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-apyx-border bg-apyx-surface flex items-center justify-between px-4 z-50">
        <Link href="/" className="text-lg font-bold font-heading text-gradient">
                      APYX Admin
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-apyx-text-secondary hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-apyx-surface border-b border-apyx-border p-4">
          <div className="space-y-1">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-apyx-purple/10 text-apyx-purple"
                      : "text-apyx-text-secondary hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-apyx-border space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-apyx-text-secondary hover:bg-white/5 hover:text-white transition-colors"
              >
                <Globe className="w-5 h-5" />
                Back to Public Site
              </Link>
              <button
                onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full mt-4 rounded-lg text-sm font-medium text-apyx-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
