import { NotFoundState } from "@/components/errors/not-found-state";

export default function NotFound() {
  return (
    <NotFoundState
      title="Page not found"
      description="The page you're looking for doesn't exist, may have been moved, or the link might be incorrect."
      backHref="/events"
      backLabel="Browse Events"
    />
  );
}
