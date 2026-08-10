import { Metadata } from "next";
import { getSetting } from "@/app/actions/settings";
import { HomepageForm } from "@/components/admin/homepage-form";

export const metadata: Metadata = {
  title: "Homepage Settings | Admin",
};

export default async function HomepageSettingsPage() {
  const homeHero = await getSetting("home_hero") || {
    badge_text: "APYX ECOSYSTEM",
    title: "The operating system for ambition.",
    subtitle: "An elite network of builders, scaling the next generation of technology through relentless execution and shared vision.",
    cta_text: "Join the Network"
  };

  const homeFoundation = await getSetting("home_foundation") || {
    title: "The APYX",
    title_highlight: "Foundation",
    description: "Our community is built on three core pillars that drive everything we do.",
    pillars: [
      { icon: "Code", title: "Build", description: "We learn by doing. From weekend hackathons to long-term open source contributions." },
      { icon: "Users", title: "Connect", description: "A network of passionate individuals sharing knowledge and opportunities." },
      { icon: "Rocket", title: "Launch", description: "Transforming ideas into reality with support from the community." }
    ]
  };

  const homeBuilders = await getSetting("home_builders") || {
    badge_text: "BUILDERS",
    title: "The talent density is the feature.",
    description: "Our community is composed of exceptional engineers, designers, and founders who push the boundaries of what's possible.",
    items: [
      { id: 1, name: "Alex Rivera", role: "ML Researcher & APYX Fellow", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", description: "Building open-source infrastructure for on-device AI models. Formerly at OpenAI.", featured: true },
      { id: 2, name: "Sarah Chen", role: "Design Engineer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", description: "Crafting spatial computing interfaces and leading design at APYX Studios.", featured: false },
      { id: 3, name: "David Kim", role: "Systems Architect", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80", description: "Scaling distributed databases for the next generation of web applications.", featured: false },
      { id: 4, name: "Maya Patel", role: "Product Founder", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", description: "Building fintech infrastructure for emerging markets. YC W25.", featured: false },
      { id: 5, name: "James Wilson", role: "Protocol Engineer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", description: "Core contributor to zero-knowledge proof ecosystems and cryptographic tools.", featured: false }
    ]
  };

  const homeArtifacts = await getSetting("home_artifacts") || {
    badge_text: "SHOWCASE",
    title: "Proof of Work.",
    description: "The APYX ecosystem produces production-grade infrastructure, applied AI research, and venture-backed startups. Here is what we've shipped.",
    items: [
      { id: "a1", title: "Project Nexus", category: "Open Source", description: "A distributed systems framework built for high-frequency trading simulations. Adopted by 3 university research labs.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", tags: ["Rust", "gRPC", "K8s"], link: "#", featured: true },
      { id: "a2", title: "SynthAI", category: "AI Research", description: "Generative audio model for synthesizing ultra-realistic speech in low-resource languages.", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80", tags: ["PyTorch", "CUDA"], link: "#", featured: false },
      { id: "a3", title: "Vektor", category: "Startup", description: "Hardware-accelerated vector database optimized for edge devices.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", tags: ["C++", "SIMD"], link: "#", featured: false }
    ]
  };

  return <HomepageForm 
    initialHero={homeHero as any} 
    initialFoundation={homeFoundation as any} 
    initialBuilders={homeBuilders as any}
    initialArtifacts={homeArtifacts as any}
  />;
}
