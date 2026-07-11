"use client";

import { ErrorState } from "@/components/errors/error-state";

export default function Error({
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
      description="We couldn't load this page. Please try again, or head back to the homepage."
      homeHref="/"
      homeLabel="Go to Homepage"
      variant="public"
    />
  );
}
