import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AdminFormLayoutProps {
  title: string;
  description: string;
  backLink: string;
  backText: string;
  error: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export function AdminFormLayout({
  title,
  description,
  backLink,
  backText,
  error,
  onSubmit,
  children,
}: AdminFormLayoutProps) {
  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <Link href={backLink} className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> {backText}
        </Link>
        <h1 className="text-3xl font-bold font-heading text-white mb-2">{title}</h1>
        <p className="text-apyx-text-secondary">{description}</p>
      </div>

      <form onSubmit={onSubmit} className="bg-apyx-surface border border-apyx-border rounded-3xl p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}
        
        {children}
      </form>
    </div>
  );
}
