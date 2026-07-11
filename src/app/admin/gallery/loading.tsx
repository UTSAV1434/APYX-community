import {
  AdminAlbumGridSkeleton,
  AdminHeaderSkeleton,
  AdminPageShell,
} from "@/components/loading/admin-skeletons";

export default function Loading() {
  return (
    <AdminPageShell>
      <AdminHeaderSkeleton withAction />
      <AdminAlbumGridSkeleton count={6} />
    </AdminPageShell>
  );
}
