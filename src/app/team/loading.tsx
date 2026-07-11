import {
  PageHeaderSkeleton,
  PublicPageShell,
  TeamGridSkeleton,
} from "@/components/loading/public-skeletons";

export default function Loading() {
  return (
    <PublicPageShell>
      <PageHeaderSkeleton withIcon lines={2} />
      <TeamGridSkeleton count={8} />
    </PublicPageShell>
  );
}
