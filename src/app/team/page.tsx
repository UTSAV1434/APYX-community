import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Users } from "lucide-react";
import { getTeamMembers } from "@/app/actions/team";
import { TeamCard } from "@/components/ui/team-card";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the core team behind APYX.",
};



export default async function TeamPage() {
  const teamMembers = await getTeamMembers(true);

  return (
    <div className="flex flex-col min-h-screen pt-24 lg:pt-32 pb-16">
      <section className="container-wide mb-16">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight text-white flex items-center gap-4">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-apyx-purple" />
              Meet the <span className="text-gradient">Team</span>
            </h1>
            <p className="text-lg sm:text-xl text-apyx-text-secondary leading-relaxed">
              The passionate students working behind the scenes to drive APYX forward and build the future of student tech.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="container-wide">
        {!teamMembers || teamMembers.length === 0 ? (
          <div className="text-center p-12 bg-apyx-surface/30 border border-apyx-border rounded-3xl">
            <p className="text-apyx-text-muted">Team members will appear here soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.1}>
                <TeamCard member={member} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
