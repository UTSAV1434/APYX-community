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
      
      {/* Inline style for the marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />

      {/* 1. Hero Image Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/[0.05]">
        {/* Full screen background image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/about-newspaper-bg.jpg" 
            alt="Newspaper background" 
            fill 
            className="object-cover object-center opacity-70 lg:opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-[#050505]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505]" />
        </div>

        <div className="container-wide relative z-10 w-full h-full flex items-center justify-center pt-20">
          
          {/* Floating Side Buttons (Match reference layout) */}
          <div className="absolute left-4 lg:left-12 top-[60%] lg:top-1/2 -translate-y-1/2">
            <Button variant="outline" className="rounded-full px-6 py-4 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-colors bg-black/40 backdrop-blur-md text-xs sm:text-sm uppercase tracking-widest font-serif">
              Who We Are
            </Button>
          </div>
          <div className="absolute right-4 lg:right-12 top-[60%] lg:top-1/2 -translate-y-1/2">
            <Button variant="outline" className="rounded-full px-6 py-4 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-colors bg-black/40 backdrop-blur-md text-xs sm:text-sm uppercase tracking-widest font-serif">
              What We Do
            </Button>
          </div>

          <ScrollReveal>
            <div className="relative mx-auto flex flex-col items-center text-center px-4">
              <h1 className="text-8xl sm:text-9xl lg:text-[14rem] font-bold font-serif tracking-tight text-white leading-none drop-shadow-2xl">
                About <span className="text-gradient">Us</span>
              </h1>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 1.5. Hero Content Section */}
      <section className="py-24 border-b border-white/[0.05] bg-[#050505]">
        <div className="container-wide">
          <ScrollReveal>
            <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
              {/* Main Typography styled like reference */}
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-serif mb-8 text-white/90 leading-tight">
                We build the <span className="font-medium italic text-gradient">future</span><br/>of student tech.
              </h2>
              <p className="text-lg sm:text-xl text-apyx-text-secondary leading-relaxed mb-12 max-w-2xl font-serif">
                APYX is more than a club. It's an ecosystem of student builders, designers, and innovators passionate about turning ideas into reality through code and collaboration.
              </p>
              <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-colors bg-[#0c0c0c] backdrop-blur-md font-serif text-sm">
                Keep Scrolling <MoveDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. What We Do Section (Matched exactly to reference layout) */}
      <section className="py-24 lg:py-32 border-b border-white/[0.05] bg-[#050505]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Column - Image Container with Text inside */}
            <div className="lg:col-span-5 h-[600px] lg:h-[800px] relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
              <ScrollReveal className="h-full w-full">
                <Image 
                  src="/about-whatwedo-bg.jpg" 
                  alt="What We Do" 
                  fill 
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Text overlaid on the image */}
                <div className="absolute inset-0">
                  <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center">
                    <h2 className="text-6xl sm:text-7xl lg:text-[7rem] font-bold font-serif text-white leading-[0.9] drop-shadow-2xl">
                      What We<br/><span className="text-gradient">Do</span>
                    </h2>
                  </div>
                  
                  <div className="absolute bottom-8 sm:bottom-12 left-8 sm:left-12">
                    <Button variant="outline" className="rounded-full px-6 py-4 border-white/30 text-white hover:bg-white/20 transition-colors bg-white/10 backdrop-blur-md text-sm font-serif">
                      Take a Look For Yourself <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column - Grid of Cards */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 pt-0 lg:pt-12">
              {standOutCards.map((card, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx} direction="up" className="h-full">
                  <div className="bg-[#0c0c0c] border border-white/10 p-8 sm:p-10 rounded-[2.5rem] h-full flex flex-col justify-center items-center text-center hover:border-apyx-purple/30 transition-all duration-300 shadow-xl aspect-square group">
                    <h3 className="text-3xl lg:text-4xl font-serif text-white mb-6 tracking-tight font-medium leading-tight group-hover:text-apyx-purple transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-apyx-text-secondary leading-relaxed text-sm lg:text-base font-serif px-2">
                      {card.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Marquee Band */}
      <div className="w-full bg-apyx-purple/10 border-y border-apyx-purple/20 py-5 overflow-hidden flex items-center relative">
        <div className="animate-marquee flex items-center w-[200%]">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="text-apyx-purple font-serif text-lg tracking-widest whitespace-nowrap mx-6">
              Join the Team ↓
            </span>
          ))}
        </div>
      </div>

      {/* 3. Original What We Do Section (Renamed to Our Initiatives) */}
      <section className="py-32 border-b border-white/[0.05] bg-[#050505]">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif mb-4 text-white">
                Our <span className="text-gradient">Initiatives</span>
              </h2>
              <p className="text-lg text-apyx-text-secondary mt-6 font-serif">
                How we bring our mission to life through action.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {whatWeDoCards.map((card, idx) => (
              <ScrollReveal key={idx} delay={0.1 * idx} direction="up">
                <div className="bg-[#0c0c0c] border border-white/5 p-8 sm:p-10 rounded-[2rem] h-full hover:border-apyx-purple/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-apyx-purple/10 flex items-center justify-center text-apyx-purple mb-8 border border-apyx-purple/20">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4 tracking-wide">{card.title}</h3>
                  <p className="text-apyx-text-secondary leading-relaxed text-base font-serif">
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Journey CTA Section */}
      <section className="py-32 bg-[#050505]">
        <div className="container-wide">
          <ScrollReveal direction="up">
            <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] p-12 sm:p-20 text-center max-w-5xl mx-auto overflow-hidden shadow-2xl group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-apyx-purple/20 blur-[100px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white mb-6 tracking-tight drop-shadow-xl">
                  Be part of the <span className="text-gradient italic">journey.</span>
                </h2>
                <p className="text-apyx-text-secondary text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-serif">
                  Ready to start building? Join hundreds of other student developers in our community.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button render={<Link href="/contact" />} size="lg" className="w-full sm:w-auto bg-apyx-purple hover:bg-apyx-purple/90 text-white rounded-full px-8 py-6 text-base font-medium shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] transition-all duration-300 font-serif tracking-wider uppercase">
                    Join The Team <ArrowRight className="w-4 h-4 ml-2" />
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
