"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  homeHref?: string;
  homeLabel?: string;
  variant?: "public" | "admin";
  error?: Error & { digest?: string };
};

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this page. Please try again in a moment.",
  onRetry,
  showRetry = true,
  homeHref = "/",
  homeLabel = "Go to Homepage",
  variant = "public",
  error,
}: ErrorStateProps) {
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

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
        <AlertTriangle className="w-8 h-8 text-apyx-amber" />
      </div>

      <h1
        className={cn(
          "font-bold font-heading text-white mb-4",
          variant === "admin" ? "text-2xl" : "text-3xl sm:text-4xl"
        )}
      >
        {title}
      </h1>

      <p className="text-apyx-text-secondary max-w-md mb-2">{description}</p>

      {error?.digest ? (
        <p className="text-xs text-apyx-text-muted mb-8 font-mono">
          Reference: {error.digest}
        </p>
      ) : (
        <div className="mb-8" />
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {showRetry && onRetry ? (
          <Button
            onClick={onRetry}
            className="bg-apyx-purple hover:bg-apyx-purple/90 text-white gap-2 min-w-[140px]"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </Button>
        ) : null}

        <Button
          variant="outline"
          render={<Link href={homeHref} />}
          className="border-apyx-border text-apyx-text-secondary hover:text-white hover:bg-white/5 gap-2 min-w-[140px]"
        >
          <Home className="w-4 h-4" />
          {homeLabel}
        </Button>
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
