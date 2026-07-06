import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Users, User } from "lucide-react";
import { getTeamMembers } from "@/app/actions/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the core team behind APYX.",
};

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

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
                <div className="bg-apyx-surface border border-apyx-border rounded-2xl overflow-hidden hover:border-apyx-purple/50 transition-colors group">
                  <div className="aspect-square relative bg-apyx-bg">
                    {member.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-apyx-text-muted">
                        <User className="w-16 h-16 opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-apyx-blue text-white backdrop-blur-sm transition-colors">
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white backdrop-blur-sm transition-colors">
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-apyx-purple text-sm font-semibold mb-1">{member.position}</p>
                    <p className="text-apyx-text-muted text-xs mb-3 font-medium uppercase tracking-wider">{member.generation}</p>
                    {member.bio && (
                      <p className="text-apyx-text-secondary text-sm line-clamp-3 mb-4">{member.bio}</p>
                    )}
                    {member.skills && member.skills.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        {member.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-apyx-text-secondary">
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-apyx-text-secondary">
                            +{member.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
