import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Megaphone,
  Pin,
  User,
} from "lucide-react";
import {
  getAnnouncementBySlug,
  getRelatedAnnouncements,
} from "@/app/actions/announcements";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { AnnouncementCategory } from "@/types/database";

const categoryColors: Record<string, string> = {
  event_launch: "bg-apyx-emerald/10 text-apyx-emerald border-apyx-emerald/30",
  partnership: "bg-apyx-blue/10 text-apyx-blue border-apyx-blue/30",
  update: "bg-apyx-purple/10 text-apyx-purple border-apyx-purple/30",
  speaker: "bg-apyx-amber/10 text-apyx-amber border-apyx-amber/30",
  registration: "bg-apyx-cyan/10 text-apyx-cyan border-apyx-cyan/30",
  results: "bg-apyx-rose/10 text-apyx-rose border-apyx-rose/30",
};

function formatCategory(category: AnnouncementCategory): string {
  return category.replace(/_/g, " ");
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const announcement = await getAnnouncementBySlug(slug);

  if (!announcement) {
    return { title: "Announcement Not Found" };
  }

  const description =
    announcement.content.length > 160
      ? `${announcement.content.slice(0, 157)}...`
      : announcement.content;

  return {
    title: announcement.title,
    description,
    openGraph: {
      title: announcement.title,
      description,
      type: "article",
      publishedTime: announcement.published_at,
      ...(announcement.cover_image
        ? { images: [{ url: announcement.cover_image, alt: announcement.title }] }
        : {}),
    },
    twitter: {
      card: announcement.cover_image ? "summary_large_image" : "summary",
      title: announcement.title,
      description,
      ...(announcement.cover_image
        ? { images: [announcement.cover_image] }
        : {}),
    },
  };
}

export default async function AnnouncementDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const announcement = await getAnnouncementBySlug(slug);

  if (!announcement) {
    notFound();
  }

  const related = await getRelatedAnnouncements(
    announcement.id,
    announcement.category
  );

  const publishedDate = format(
    new Date(announcement.published_at),
    "MMMM d, yyyy"
  );

  return (
    <div className="flex flex-col min-h-screen pt-24 lg:pt-32 pb-16">
      <div className="container-wide mb-8">
        <Link
          href="/announcements"
          className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Announcements
        </Link>
      </div>

      {/* Hero */}
      <section className="container-wide relative mb-12 lg:mb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-apyx-purple/10 blur-[120px] rounded-full pointer-events-none" />

        <ScrollReveal className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${
                categoryColors[announcement.category] || categoryColors.update
              }`}
            >
              {formatCategory(announcement.category)}
            </span>
            {announcement.is_pinned && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-apyx-rose/10 border border-apyx-rose/20 text-apyx-rose text-xs font-bold uppercase tracking-wider">
                <Pin className="w-3 h-3" />
                Pinned
              </span>
            )}
            <span className="flex items-center text-sm text-apyx-text-muted gap-1.5">
              <Calendar className="w-4 h-4" />
              {publishedDate}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight leading-tight">
            {announcement.title}
          </h1>

          <div className="flex items-center gap-3 text-apyx-text-secondary">
            <div className="w-9 h-9 rounded-full bg-apyx-surface border border-apyx-border flex items-center justify-center shrink-0">
              <Megaphone className="w-4 h-4 text-apyx-purple" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-apyx-text-muted" />
              <span className="font-medium text-white">APYX Core Team</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="container-wide grid lg:grid-cols-3 gap-12 relative">
        {/* Main content */}
        <article className="lg:col-span-2 relative z-10">
          <ScrollReveal>
            {announcement.cover_image ? (
              <div className="aspect-video w-full rounded-3xl overflow-hidden mb-10 border border-apyx-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={announcement.cover_image}
                  alt={announcement.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[21/9] w-full rounded-3xl bg-apyx-surface border border-apyx-border mb-10 overflow-hidden flex items-center justify-center">
                <Megaphone className="w-12 h-12 text-apyx-text-muted/40" />
              </div>
            )}

            <div className="bg-apyx-surface border border-apyx-border rounded-3xl p-6 sm:p-10">
              <div className="prose prose-invert max-w-none">
                <p className="text-apyx-text-secondary text-lg leading-relaxed whitespace-pre-wrap">
                  {announcement.content}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </article>

        {/* Related announcements */}
        <aside className="relative z-10">
          <ScrollReveal delay={0.1}>
            <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-6 sm:p-8 sticky top-32">
              <h2 className="text-lg font-bold text-white mb-6 font-heading border-b border-apyx-border pb-4">
                Related Updates
              </h2>

              {related.length === 0 ? (
                <p className="text-sm text-apyx-text-muted">
                  No other announcements yet.
                </p>
              ) : (
                <ul className="space-y-4">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/announcements/${item.slug}`}
                        className="group block p-4 rounded-xl border border-apyx-border bg-apyx-bg hover:border-apyx-purple/40 hover:bg-apyx-bg/80 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                              categoryColors[item.category] ||
                              categoryColors.update
                            }`}
                          >
                            {formatCategory(item.category)}
                          </span>
                          <time className="text-[10px] text-apyx-text-muted ml-auto">
                            {format(new Date(item.published_at), "MMM d")}
                          </time>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-white group-hover:text-apyx-cyan transition-colors line-clamp-2">
                            {item.title}
                          </p>
                          <ArrowUpRight className="w-4 h-4 text-apyx-text-muted group-hover:text-apyx-cyan shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href="/announcements"
                className="mt-6 inline-flex items-center text-sm font-medium text-apyx-purple hover:text-apyx-cyan transition-colors"
              >
                View all announcements
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </ScrollReveal>
        </aside>
      </section>
    </div>
  );
}
