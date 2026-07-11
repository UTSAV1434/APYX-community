import {
  AnnouncementListSkeleton,
  PageHeaderSkeleton,
  PublicPageShell,
} from "@/components/loading/public-skeletons";

export default function Loading() {
  return (
    <PublicPageShell>
      <PageHeaderSkeleton lines={2} />
      <AnnouncementListSkeleton count={4} />
    </PublicPageShell>
  );
}
