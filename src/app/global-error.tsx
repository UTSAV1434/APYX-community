"use client";

import { ErrorState } from "@/components/errors/error-state";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ErrorState
          error={error}
          onRetry={reset}
          title="Unexpected error"
          description="Something went wrong on our end. Please try again, or return to the homepage."
          homeHref="/"
          homeLabel="Go to Homepage"
          variant="public"
        />
      </body>
    </html>
  );
}
