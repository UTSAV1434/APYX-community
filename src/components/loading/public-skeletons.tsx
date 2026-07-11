import { cn } from "@/lib/utils";
import { ApyxSkeleton } from "@/components/loading/apyx-skeleton";

export function PublicPageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col min-h-screen pt-24 lg:pt-32 pb-16",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PageHeaderSkeleton({
  withIcon = false,
  lines = 2,
}: {
  withIcon?: boolean;
  lines?: number;
}) {
  return (
    <section className="container-wide mb-12 lg:mb-16">
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-4">
          {withIcon && <ApyxSkeleton className="h-12 w-12 rounded-xl shrink-0" />}
          <ApyxSkeleton className="h-12 sm:h-14 lg:h-16 w-full max-w-xl rounded-xl" />
        </div>
        {Array.from({ length: lines }).map((_, i) => (
          <ApyxSkeleton
            key={i}
            className={cn(
              "h-5 rounded-lg",
              i === lines - 1 ? "w-4/5" : "w-full"
            )}
          />
        ))}
      </div>
    </section>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="rounded-2xl border border-apyx-border bg-apyx-surface overflow-hidden">
      <ApyxSkeleton className="aspect-[16/10] w-full rounded-none border-0" />
      <div className="p-6 space-y-3">
        <div className="flex gap-2">
          <ApyxSkeleton className="h-5 w-20 rounded-full" />
          <ApyxSkeleton className="h-5 w-16 rounded-full" />
        </div>
        <ApyxSkeleton className="h-7 w-3/4 rounded-lg" />
        <ApyxSkeleton className="h-4 w-full rounded-md" />
        <ApyxSkeleton className="h-4 w-5/6 rounded-md" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section className="container-wide pb-8">
      <div className="flex items-center justify-between mb-12">
        <ApyxSkeleton className="h-10 w-64 rounded-lg" />
        <div className="hidden sm:flex gap-2">
          <ApyxSkeleton className="h-10 w-24 rounded-lg" />
          <ApyxSkeleton className="h-10 w-20 rounded-lg" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function TeamCardSkeleton() {
  return (
    <div className="rounded-2xl border border-apyx-border bg-apyx-surface overflow-hidden">
      <ApyxSkeleton className="aspect-square w-full rounded-none border-0" />
      <div className="p-5 space-y-2 flex flex-col items-center">
        <ApyxSkeleton className="h-5 w-32 rounded-md" />
        <ApyxSkeleton className="h-4 w-24 rounded-md" />
        <ApyxSkeleton className="h-3 w-20 rounded-md" />
        <ApyxSkeleton className="h-4 w-full rounded-md mt-2" />
      </div>
    </div>
  );
}

export function TeamGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <section className="container-wide">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <TeamCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function AlbumCardSkeleton() {
  return (
    <div className="rounded-2xl border border-apyx-border bg-apyx-surface overflow-hidden">
      <ApyxSkeleton className="aspect-[4/3] w-full rounded-none border-0" />
      <div className="p-5 space-y-2">
        <ApyxSkeleton className="h-6 w-2/3 rounded-md" />
        <ApyxSkeleton className="h-4 w-full rounded-md" />
      </div>
    </div>
  );
}

export function AlbumGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="container-wide">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <AlbumCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function AnnouncementListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <section className="container-wide max-w-4xl mx-auto space-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-apyx-border bg-apyx-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex gap-3">
            <ApyxSkeleton className="h-6 w-24 rounded-full" />
            <ApyxSkeleton className="h-6 w-28 rounded-full" />
          </div>
          <ApyxSkeleton className="h-8 w-4/5 rounded-lg" />
          <ApyxSkeleton className="aspect-video w-full rounded-xl border-0" />
          <ApyxSkeleton className="h-4 w-full rounded-md" />
          <ApyxSkeleton className="h-4 w-full rounded-md" />
          <ApyxSkeleton className="h-4 w-3/4 rounded-md" />
        </div>
      ))}
    </section>
  );
}

export function AnnouncementDetailSkeleton() {
  return (
    <PublicPageShell>
      <div className="container-wide mb-8">
        <ApyxSkeleton className="h-5 w-44 rounded-md" />
      </div>
      <section className="container-wide mb-12">
        <div className="max-w-4xl space-y-4">
          <div className="flex gap-3">
            <ApyxSkeleton className="h-6 w-24 rounded-full" />
            <ApyxSkeleton className="h-6 w-32 rounded-md" />
          </div>
          <ApyxSkeleton className="h-14 lg:h-16 w-full rounded-xl" />
          <ApyxSkeleton className="h-5 w-48 rounded-md" />
        </div>
      </section>
      <section className="container-wide grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <ApyxSkeleton className="aspect-video w-full rounded-3xl border-0" />
          <div className="rounded-3xl border border-apyx-border bg-apyx-surface p-8 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ApyxSkeleton key={i} className="h-4 w-full rounded-md" />
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-apyx-border bg-apyx-surface p-6 space-y-4">
            <ApyxSkeleton className="h-6 w-40 rounded-md" />
            {Array.from({ length: 3 }).map((_, i) => (
              <ApyxSkeleton key={i} className="h-20 w-full rounded-xl border-0" />
            ))}
          </div>
        </aside>
      </section>
    </PublicPageShell>
  );
}

export function EventDetailSkeleton() {
  return (
    <PublicPageShell>
      <div className="container-wide mb-8">
        <ApyxSkeleton className="h-5 w-36 rounded-md" />
      </div>
      <section className="container-wide grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <ApyxSkeleton className="h-6 w-24 rounded-full" />
          <ApyxSkeleton className="h-14 lg:h-16 w-full rounded-xl" />
          <ApyxSkeleton className="aspect-video w-full rounded-3xl border-0" />
          <ApyxSkeleton className="h-8 w-48 rounded-lg" />
          {Array.from({ length: 5 }).map((_, i) => (
            <ApyxSkeleton key={i} className="h-4 w-full rounded-md" />
          ))}
        </div>
        <aside>
          <div className="rounded-2xl border border-apyx-border bg-apyx-surface p-8 space-y-6">
            <ApyxSkeleton className="h-6 w-32 rounded-md" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <ApyxSkeleton className="h-10 w-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <ApyxSkeleton className="h-4 w-full rounded-md" />
                  <ApyxSkeleton className="h-3 w-2/3 rounded-md" />
                </div>
              </div>
            ))}
            <ApyxSkeleton className="h-12 w-full rounded-lg" />
          </div>
        </aside>
      </section>
    </PublicPageShell>
  );
}

export function GalleryDetailSkeleton() {
  return (
    <PublicPageShell>
      <div className="container-wide mb-8">
        <ApyxSkeleton className="h-5 w-36 rounded-md" />
      </div>
      <PageHeaderSkeleton lines={1} />
      <section className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <ApyxSkeleton
              key={i}
              className={cn(
                "rounded-xl border-0",
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              )}
            />
          ))}
        </div>
      </section>
    </PublicPageShell>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero placeholder */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="container-wide text-center space-y-6 px-4">
          <ApyxSkeleton className="h-16 sm:h-20 lg:h-24 w-full max-w-4xl mx-auto rounded-2xl" />
          <ApyxSkeleton className="h-6 w-full max-w-2xl mx-auto rounded-lg" />
          <ApyxSkeleton className="h-6 w-4/5 max-w-xl mx-auto rounded-lg" />
          <ApyxSkeleton className="h-14 w-48 mx-auto rounded-full" />
        </div>
      </section>

      {/* Featured event */}
      <div className="-mt-32 pt-32 section-padding container-wide">
        <div className="rounded-3xl border border-apyx-border bg-apyx-surface p-8 lg:p-12 grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <ApyxSkeleton className="h-6 w-28 rounded-full" />
            <ApyxSkeleton className="h-10 w-full rounded-xl" />
            <ApyxSkeleton className="h-4 w-full rounded-md" />
            <ApyxSkeleton className="h-4 w-5/6 rounded-md" />
            <ApyxSkeleton className="h-12 w-40 rounded-full" />
          </div>
          <ApyxSkeleton className="aspect-video w-full rounded-2xl border-0" />
        </div>
      </div>

      {/* Activity + announcements */}
      <section className="section-padding container-wide">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 min-h-[500px]">
          <div className="lg:col-span-1 rounded-2xl border border-apyx-border bg-apyx-surface p-6 space-y-4">
            <ApyxSkeleton className="h-6 w-32 rounded-md" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <ApyxSkeleton className="h-8 w-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <ApyxSkeleton className="h-4 w-full rounded-md" />
                  <ApyxSkeleton className="h-3 w-20 rounded-md" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 space-y-4">
            <ApyxSkeleton className="h-6 w-40 rounded-md" />
            {Array.from({ length: 3 }).map((_, i) => (
              <ApyxSkeleton key={i} className="h-24 w-full rounded-xl border-0" />
            ))}
          </div>
        </div>
      </section>

      <EventGridSkeleton count={2} />

      {/* Impact + gallery + CTA blocks */}
      <section className="section-padding container-wide">
        <ApyxSkeleton className="h-64 w-full rounded-3xl border-0" />
      </section>
      <section className="section-padding container-wide">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ApyxSkeleton key={i} className="aspect-square rounded-xl border-0" />
          ))}
        </div>
      </section>
    </div>
  );
}
