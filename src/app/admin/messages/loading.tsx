import {
  AdminHeaderSkeleton,
  AdminMessagesSkeleton,
  AdminPageShell,
} from "@/components/loading/admin-skeletons";

export default function Loading() {
  return (
    <AdminPageShell>
      <AdminHeaderSkeleton />
      <AdminMessagesSkeleton count={5} />
    </AdminPageShell>
  );
}
