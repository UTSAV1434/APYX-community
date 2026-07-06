import { Metadata } from "next";
import { ArrowRight, Target, Lightbulb, Rocket, Heart, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about APYX's mission to empower student builders through hackathons, workshops, and real-world projects.",
};

const values = [
  { icon: Target, title: "Impact Driven", desc: "We focus on building solutions that matter and create tangible value." },
  { icon: Lightbulb, title: "Innovation First", desc: "Pushing boundaries and exploring emerging technologies." },
  { icon: Users, title: "Community Core", desc: "A supportive ecosystem where everyone learns and grows together." },
  { icon: Rocket, title: "Bias for Action", desc: "Less talking, more shipping. We learn by building." },
  { icon: Shield, title: "Open & Inclusive", desc: "Tech is for everyone. We welcome all backgrounds and skill levels." },
  { icon: Heart, title: "Passion", desc: "We genuinely love technology and the art of creation." },
];



const timeline = [
  { year: "2023", title: "The Spark", desc: "APYX was founded by a small group of student developers." },
  { year: "2024", title: "First Hackathon", desc: "Hosted our flagship 48-hour hackathon with 200+ attendees." },
  { year: "2025", title: "Expansion", desc: "Launched our project incubator and partnered with Devfolio." },
  { year: "2026", title: "The Future", desc: "Scaling our impact across multiple campuses and tech stacks." },
];

export default function AboutPage() {

  return (
    <div className="flex flex-col min-h-screen pt-24 lg:pt-32 pb-16">
      {/* Hero Section */}
      <section className="container-wide mb-24">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading mb-6 tracking-tight">
              We build the <span className="text-gradient">future</span> of student tech.
            </h1>
            <p className="text-lg sm:text-xl text-apyx-text-secondary leading-relaxed mb-8">
              APYX is more than a club. It&apos;s an ecosystem of student builders, designers, and innovators passionate about turning ideas into reality through code and collaboration.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Mission & Vision */}
      <section className="container-wide mb-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-brand opacity-5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 relative z-10">
          <ScrollReveal direction="up" className="bg-apyx-surface border border-apyx-border rounded-3xl p-8 sm:p-12 hover:border-apyx-purple/50 transition-colors">
            <h2 className="text-2xl font-bold font-heading text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-apyx-purple/10 flex items-center justify-center text-apyx-purple">
                <Target className="w-5 h-5" />
              </div>
              Our Mission
            </h2>
            <p className="text-apyx-text-secondary leading-relaxed text-lg">
              To democratize access to cutting-edge technology education and provide a platform where students can bridge the gap between theoretical knowledge and real-world engineering.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="bg-apyx-surface border border-apyx-border rounded-3xl p-8 sm:p-12 hover:border-apyx-cyan/50 transition-colors">
            <h2 className="text-2xl font-bold font-heading text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-apyx-cyan/10 flex items-center justify-center text-apyx-cyan">
                <Lightbulb className="w-5 h-5" />
              </div>
              Our Vision
            </h2>
            <p className="text-apyx-text-secondary leading-relaxed text-lg">
              To be the premier launchpad for student-led startups and technical talent, fostering an environment where innovation thrives without boundaries.
            </p>
          </ScrollReveal>
        </div>
      </section>



      {/* Core Values */}
      <section className="bg-apyx-surface/30 border-y border-apyx-border py-24 mb-32">
        <div className="container-wide">
          <SectionHeader 
            title="Core Values" 
            subtitle="The principles that guide our community and how we build."
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-apyx-bg border border-apyx-border h-full hover:border-apyx-purple/30 transition-colors group">
                  <value.icon className="w-8 h-8 text-apyx-text-muted mb-4 group-hover:text-apyx-purple transition-colors" />
                  <h3 className="text-lg font-bold font-heading text-white mb-2">{value.title}</h3>
                  <p className="text-apyx-text-secondary text-sm leading-relaxed">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="container-wide mb-32">
        <SectionHeader 
          title="Our Journey" 
          subtitle="How we got here and where we are going next."
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-apyx-border ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 space-y-12 py-8">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} className="relative">
                <div className={`md:flex items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-apyx-purple ring-4 ring-apyx-bg z-10" />
                  
                  {/* Content */}
                  <div className="ml-8 md:ml-0 md:w-[45%] bg-apyx-surface border border-apyx-border p-6 rounded-2xl">
                    <span className="text-apyx-purple font-mono text-sm font-bold block mb-2">{item.year}</span>
                    <h3 className="text-xl font-bold font-heading text-white mb-2">{item.title}</h3>
                    <p className="text-apyx-text-secondary text-sm">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="container-wide">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-apyx-surface to-apyx-bg border border-apyx-border rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-6">
              Be part of the journey.
            </h2>
            <p className="text-apyx-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Ready to start building? Join hundreds of other student developers in our community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button render={<Link href="/contact" />} size="lg" className="w-full sm:w-auto bg-apyx-purple hover:bg-apyx-purple/90 text-white">
                Join the Team <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button render={<Link href="/events" />} size="lg" variant="outline" className="w-full sm:w-auto text-white border-apyx-border hover:bg-white/5">
                Explore Events
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
