import { Metadata } from "next";
import { ArrowRight, Lightbulb, Rocket, Heart, Users, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about APYX's mission to empower student builders through hackathons, workshops, and real-world projects.",
};

const standOutCards = [
  { icon: Rocket, title: "Innovation First", desc: "Pushing boundaries and exploring emerging technologies." },
  { icon: Users, title: "Community Driven", desc: "A supportive ecosystem where everyone learns and grows together." },
  { icon: Lightbulb, title: "Bias for Action", desc: "Less talking, more shipping. We learn by building." },
  { icon: Heart, title: "Open & Inclusive", desc: "We welcome all backgrounds and skill levels." },
];

const whatWeDoCards = [
  { icon: Rocket, title: "Hackathons", desc: "We host high-energy hackathons where students can build, collaborate, and compete to create innovative solutions in just 48 hours." },
  { icon: Users, title: "Workshops & Events", desc: "From technical deep-dives to founder talks, we bring in industry experts to bridge the gap between classroom theory and industry practice." },
  { icon: Lightbulb, title: "Project Incubator", desc: "We support student-led projects by providing mentorship, resources, and a platform to launch their ideas into the real world." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      
      {/* 1. Hero Image Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/[0.05]">
        {/* Full screen background image (Centered Hands) */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/about-newspaper-bg.jpg" 
            alt="Newspaper background" 
            fill 
            className="object-cover object-center opacity-70 lg:opacity-100"
            priority
          />
          {/* Subtle gradient overlays to blend into the page */}
          <div className="absolute inset-0 bg-[#050505]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        </div>

        <div className="container-wide relative z-10 w-full pt-20">
          <ScrollReveal>
            <div className="relative mx-auto flex flex-col items-center text-center">
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold font-serif tracking-tight text-white leading-none drop-shadow-2xl">
                About <span className="text-gradient">Us</span>
              </h1>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 1.5. Hero Content Section */}
      <section className="py-24 border-b border-white/[0.05]">
        <div className="container-wide">
          <ScrollReveal>
            <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
              
              {/* Top Row Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-16 justify-center w-full">
                <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-colors bg-[#080808] backdrop-blur-md">
                  Who We Are
                </Button>
                <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-colors bg-[#080808] backdrop-blur-md">
                  What We Do
                </Button>
              </div>

              {/* Main Typography */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif mb-8 text-white/90 leading-tight">
                We build the <span className="text-gradient">future</span><br/>of student tech.
              </h2>
              <p className="text-lg sm:text-xl text-apyx-text-secondary leading-relaxed mb-12 max-w-2xl">
                APYX is more than a club. It's an ecosystem of student builders, designers, and innovators passionate about turning ideas into reality through code and collaboration.
              </p>
              <Button variant="outline" className="rounded-full px-8 py-6 border-apyx-purple/30 text-apyx-purple hover:bg-apyx-purple/10 hover:border-apyx-purple/60 transition-colors bg-[#080808] backdrop-blur-md">
                Keep Scrolling <MoveDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. What Makes Us Stand Out Section */}
      <section className="relative py-32 border-b border-white/[0.05] overflow-hidden">
        {/* Left side background image (Hands) */}
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-1/2 z-0">
          <Image 
            src="/about-whatwedo-bg.jpg" 
            alt="Supportive glowing hands" 
            fill 
            className="object-cover object-[center_left] opacity-80 lg:opacity-100"
          />
          {/* Gradient to fade into the black background on the right */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent lg:via-[#050505]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left Column - Heading over the hands */}
            <ScrollReveal>
              <div className="max-w-lg">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif mb-12 text-white leading-tight drop-shadow-xl">
                  What We<br/><span className="text-gradient">Do</span>
                </h2>
                <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-colors bg-black/40 backdrop-blur-md">
                  Take a Look For Yourself <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </ScrollReveal>

            {/* Right Column - Grid of Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {standOutCards.map((card, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx} direction="up">
                  <div className="bg-[#080808]/90 backdrop-blur-xl border border-white/5 p-8 rounded-2xl h-full hover:border-apyx-purple/30 transition-all duration-300 group shadow-[0_4px_40px_-10px_rgba(0,0,0,0.8)]">
                    <div className="w-12 h-12 rounded-full bg-apyx-purple/10 flex items-center justify-center text-apyx-purple mb-6 group-hover:scale-110 transition-transform duration-500 border border-apyx-purple/20">
                      <card.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-3 tracking-wide">{card.title}</h3>
                    <p className="text-apyx-text-secondary leading-relaxed text-sm">
                      {card.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Do Section */}
      <section className="py-32 border-b border-white/[0.05]">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif mb-4 text-white">
                What We <span className="text-gradient">Do</span>
              </h2>
              <p className="text-lg text-apyx-text-secondary mt-6">
                How we bring our mission to life through action.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {whatWeDoCards.map((card, idx) => (
              <ScrollReveal key={idx} delay={0.1 * idx} direction="up">
                <div className="bg-[#080808]/90 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-3xl h-full hover:border-apyx-purple/30 transition-all duration-300 group shadow-[0_4px_40px_-10px_rgba(0,0,0,0.8)]">
                  <div className="w-14 h-14 rounded-2xl bg-apyx-purple/10 flex items-center justify-center text-apyx-purple mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 border border-apyx-purple/20 shadow-[0_0_30px_-10px_rgba(168,85,247,0.4)]">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4 tracking-wide">{card.title}</h3>
                  <p className="text-apyx-text-secondary leading-relaxed text-base">
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Journey CTA Section */}
      <section className="py-32">
        <div className="container-wide">
          <ScrollReveal direction="up">
            <div className="relative bg-[#080808]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 sm:p-20 text-center max-w-5xl mx-auto overflow-hidden group shadow-[0_4px_40px_-10px_rgba(0,0,0,0.8)]">
              {/* Subtle background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-apyx-purple/20 blur-[100px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white mb-6 tracking-tight drop-shadow-xl">
                  Be part of the <span className="text-gradient">journey.</span>
                </h2>
                <p className="text-apyx-text-secondary text-lg sm:text-xl mb-12 max-w-2xl mx-auto">
                  Ready to start building? Join hundreds of other student developers in our community.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button render={<Link href="/contact" />} size="lg" className="w-full sm:w-auto bg-apyx-purple hover:bg-apyx-purple/90 text-white rounded-full px-8 py-6 text-base font-medium shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_-5px_rgba(168,85,247,0.7)] transition-all duration-300">
                    Join The Team <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button render={<Link href="/events" />} size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 bg-black/40 backdrop-blur-md">
                    Explore Events
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
