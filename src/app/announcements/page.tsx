import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Megaphone, Calendar } from "lucide-react";
import { getAnnouncements } from "@/app/actions/announcements";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Latest news, updates, and community highlights from APYX.",
};

export default async function AnnouncementsPage() {
  const updates = await getAnnouncements();

  return (
    <div className="flex flex-col min-h-screen pt-24 lg:pt-32 pb-16">
      <section className="container-wide mb-16">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight text-white">
              Latest <span className="text-gradient">Announcements</span>
            </h1>
            <p className="text-lg sm:text-xl text-apyx-text-secondary leading-relaxed">
              Stay in the loop with the newest updates, platform changes, and community news.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="container-wide max-w-4xl mx-auto">
        <div className="space-y-8">
          {!updates || updates.length === 0 ? (
            <div className="text-center py-24 bg-apyx-surface border border-apyx-border rounded-3xl">
              <p className="text-apyx-text-secondary text-lg">No announcements right now. Check back later!</p>
            </div>
          ) : (
            updates.map((update, index) => (
              <ScrollReveal key={update.id} delay={index * 0.1}>
                <article className="group relative bg-apyx-surface border border-apyx-border rounded-3xl p-6 sm:p-8 hover:border-apyx-purple/50 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-apyx-purple/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-apyx-purple/20 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-apyx-purple/10 border border-apyx-purple/20 text-apyx-purple text-xs font-bold uppercase tracking-wider">
                        {update.category.replace('_', ' ')}
                      </span>
                      {update.is_pinned && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-apyx-rose/10 border border-apyx-rose/20 text-apyx-rose text-xs font-bold uppercase tracking-wider">
                          Pinned
                        </span>
                      )}
                      <span className="flex items-center text-sm text-apyx-text-muted gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(update.published_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-4">
                      {update.title}
                    </h2>
                    
                    {update.cover_image && (
                      <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 border border-apyx-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={update.cover_image} alt={update.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    
                    <p className="text-apyx-text-secondary leading-relaxed mb-6 whitespace-pre-wrap">
                      {update.content}
                    </p>

                    <div className="pt-6 border-t border-apyx-border flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-apyx-bg border border-apyx-border flex items-center justify-center">
                          <Megaphone className="w-4 h-4 text-apyx-purple" />
                        </div>
                        <span className="text-sm font-medium text-white">
                          APYX Core Team
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
