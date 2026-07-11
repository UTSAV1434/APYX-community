"use client";

import { ErrorState } from "@/components/errors/error-state";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      error={error}
      onRetry={reset}
      title="Something went wrong"
      description="We couldn't load this admin page. Please try again, or return to the dashboard."
      homeHref="/admin"
      homeLabel="Admin Dashboard"
      variant="admin"
    />
  );
}
