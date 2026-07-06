import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  gradient?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  actionHref,
  gradient = false,
  className,
}: SectionHeaderProps) {
  return (
    <ScrollReveal className={className}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-12">
        <div>
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-heading ${
              gradient ? "text-gradient" : "text-white"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-apyx-text-secondary text-sm sm:text-base max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-apyx-purple hover:text-apyx-cyan transition-colors whitespace-nowrap group"
          >
            {actionLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </ScrollReveal>
  );
}
