import { cn } from "@/lib/utils";
import { ApyxSkeleton } from "@/components/loading/apyx-skeleton";

export function AdminPageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-6 lg:p-10", className)}>{children}</div>;
}

export function AdminHeaderSkeleton({ withAction = false }: { withAction?: boolean }) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-3 flex-1">
        <ApyxSkeleton className="h-9 w-56 rounded-lg" />
        <ApyxSkeleton className="h-5 w-full max-w-md rounded-md" />
      </div>
      {withAction && <ApyxSkeleton className="h-10 w-36 rounded-lg shrink-0" />}
    </div>
  );
}

export function AdminStatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-apyx-border bg-apyx-surface p-6 space-y-3"
        >
          <ApyxSkeleton className="h-10 w-10 rounded-lg" />
          <ApyxSkeleton className="h-8 w-16 rounded-md" />
          <ApyxSkeleton className="h-4 w-28 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function AdminTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-apyx-border bg-apyx-surface overflow-hidden">
      <div className="p-4 border-b border-apyx-border">
        <ApyxSkeleton className="h-10 w-full max-w-sm rounded-lg" />
      </div>
      <div className="divide-y divide-apyx-border">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-4">
            <ApyxSkeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ApyxSkeleton className="h-4 w-full rounded-md" />
              <ApyxSkeleton className="h-4 w-full rounded-md hidden sm:block" />
              <ApyxSkeleton className="h-4 w-full rounded-md hidden sm:block" />
              <ApyxSkeleton className="h-4 w-16 rounded-md hidden sm:block ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminAlbumGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-apyx-border bg-apyx-surface overflow-hidden"
        >
          <ApyxSkeleton className="aspect-video w-full rounded-none border-0" />
          <div className="p-5 flex justify-between items-center">
            <div className="space-y-2 flex-1">
              <ApyxSkeleton className="h-5 w-32 rounded-md" />
              <ApyxSkeleton className="h-4 w-24 rounded-md" />
            </div>
            <ApyxSkeleton className="h-9 w-9 rounded-lg shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminMessagesSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-apyx-border bg-apyx-surface p-6 space-y-4"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1">
              <ApyxSkeleton className="h-5 w-40 rounded-md" />
              <ApyxSkeleton className="h-4 w-56 rounded-md" />
            </div>
            <ApyxSkeleton className="h-6 w-20 rounded-full shrink-0" />
          </div>
          <ApyxSkeleton className="h-4 w-full rounded-md" />
          <ApyxSkeleton className="h-4 w-4/5 rounded-md" />
          <div className="flex gap-2 pt-2">
            <ApyxSkeleton className="h-9 w-28 rounded-lg" />
            <ApyxSkeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminFormSkeleton() {
  return (
    <AdminPageShell>
      <div className="mb-8 space-y-3">
        <ApyxSkeleton className="h-5 w-32 rounded-md" />
        <ApyxSkeleton className="h-9 w-64 rounded-lg" />
        <ApyxSkeleton className="h-5 w-96 max-w-full rounded-md" />
      </div>
      <div className="max-w-3xl rounded-3xl border border-apyx-border bg-apyx-surface p-6 sm:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <ApyxSkeleton className="h-12 w-full rounded-lg" />
          <ApyxSkeleton className="h-12 w-full rounded-lg" />
        </div>
        <ApyxSkeleton className="h-32 w-full rounded-lg" />
        <ApyxSkeleton className="h-12 w-full rounded-lg" />
        <div className="grid sm:grid-cols-2 gap-6">
          <ApyxSkeleton className="h-12 w-full rounded-lg" />
          <ApyxSkeleton className="h-12 w-full rounded-lg" />
        </div>
        <ApyxSkeleton className="h-12 w-36 rounded-lg ml-auto" />
      </div>
    </AdminPageShell>
  );
}

export function AdminGalleryDetailSkeleton() {
  return (
    <AdminPageShell>
      <div className="mb-8 space-y-3">
        <ApyxSkeleton className="h-5 w-32 rounded-md" />
        <ApyxSkeleton className="h-9 w-72 rounded-lg" />
        <ApyxSkeleton className="h-5 w-full max-w-lg rounded-md" />
      </div>
      <ApyxSkeleton className="h-40 w-full max-w-2xl rounded-2xl mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ApyxSkeleton key={i} className="aspect-square rounded-xl border-0" />
        ))}
      </div>
    </AdminPageShell>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <AdminPageShell>
      <AdminHeaderSkeleton withAction />
      <AdminStatsSkeleton />
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-apyx-border bg-apyx-surface p-6 space-y-4">
          <ApyxSkeleton className="h-6 w-40 rounded-md" />
          {Array.from({ length: 3 }).map((_, i) => (
            <ApyxSkeleton key={i} className="h-16 w-full rounded-xl border-0" />
          ))}
        </div>
        <div className="rounded-2xl border border-apyx-border bg-apyx-surface p-6 space-y-4">
          <ApyxSkeleton className="h-6 w-36 rounded-md" />
          {Array.from({ length: 4 }).map((_, i) => (
            <ApyxSkeleton key={i} className="h-12 w-full rounded-lg border-0" />
          ))}
        </div>
      </div>
    </AdminPageShell>
  );
}
