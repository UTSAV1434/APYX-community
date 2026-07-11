import {
  AdminHeaderSkeleton,
  AdminPageShell,
  AdminTableSkeleton,
} from "@/components/loading/admin-skeletons";

export default function Loading() {
  return (
    <AdminPageShell>
      <AdminHeaderSkeleton withAction />
      <AdminTableSkeleton rows={5} />
    </AdminPageShell>
  );
}
