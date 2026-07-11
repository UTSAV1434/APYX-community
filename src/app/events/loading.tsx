import {
  EventGridSkeleton,
  PageHeaderSkeleton,
  PublicPageShell,
} from "@/components/loading/public-skeletons";

export default function Loading() {
  return (
    <PublicPageShell>
      <PageHeaderSkeleton lines={2} />
      <EventGridSkeleton count={4} />
    </PublicPageShell>
  );
}
