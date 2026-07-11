import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotFoundStateProps = {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  backHref?: string;
  backLabel?: string;
  showHomeLink?: boolean;
  variant?: "public" | "admin";
};

export function NotFoundState({
  title = "Page not found",
  description = "The page you're looking for doesn't exist or may have been moved.",
  icon: Icon = FileQuestion,
  backHref,
  backLabel,
  showHomeLink = true,
  variant = "public",
}: NotFoundStateProps) {
  const content = (
    <>
      <div
        className={cn(
          "w-16 h-16 rounded-2xl border flex items-center justify-center mb-6",
          variant === "admin"
            ? "bg-apyx-bg border-apyx-border"
            : "bg-apyx-surface border-apyx-border"
        )}
      >
        <Icon className="w-8 h-8 text-apyx-purple" />
      </div>

      <p className="text-sm font-mono text-apyx-text-muted mb-3">404</p>

      <h1
        className={cn(
          "font-bold font-heading text-white mb-4",
          variant === "admin" ? "text-2xl" : "text-3xl sm:text-4xl"
        )}
      >
        {title}
      </h1>

      <p className="text-apyx-text-secondary max-w-md mb-8">{description}</p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {backHref && backLabel ? (
          <Button
            render={<Link href={backHref} />}
            className="bg-apyx-purple hover:bg-apyx-purple/90 text-white gap-2 min-w-[160px]"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Button>
        ) : null}

        {showHomeLink ? (
          <Button
            variant="outline"
            render={
              <Link href={variant === "admin" ? "/admin" : "/"} />
            }
            className="border-apyx-border text-apyx-text-secondary hover:text-white hover:bg-white/5 gap-2 min-w-[160px]"
          >
            <Home className="w-4 h-4" />
            {variant === "admin" ? "Admin Dashboard" : "Go to Homepage"}
          </Button>
        ) : null}
      </div>
    </>
  );

  if (variant === "admin") {
    return (
      <div className="p-6 lg:p-10">
        <div className="flex flex-col items-center justify-center text-center py-24 bg-apyx-surface border border-apyx-border rounded-3xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[60vh] pt-24 lg:pt-32 pb-16">
      <div className="container-wide flex flex-col items-center justify-center text-center py-24">
        {content}
      </div>
    </div>
  );
}
