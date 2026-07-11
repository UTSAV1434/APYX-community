import {
  AlbumGridSkeleton,
  PageHeaderSkeleton,
  PublicPageShell,
} from "@/components/loading/public-skeletons";

export default function Loading() {
  return (
    <PublicPageShell>
      <PageHeaderSkeleton lines={2} />
      <AlbumGridSkeleton count={6} />
    </PublicPageShell>
  );
}
