import { Suspense } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { FoundationSection } from "@/components/home/foundation-section";
import { ArtifactsSection } from "@/components/home/artifacts-section";
import { MomentumSection } from "@/components/home/momentum-section";
import { BuildersSection } from "@/components/home/builders-section";
import { ThresholdSection } from "@/components/home/threshold-section";
import { createClient } from "@/lib/supabase/server";
import { getSetting } from "@/app/actions/settings";

async function MomentumDataFetcher() {
  const supabase = await createClient();
  
  const { data: featuredEvent } = await supabase
    .from("events")
    .select("*")
    .eq("is_featured", true)
    .single();

  const { data: eventsData } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true })
    .limit(3);

  const events = eventsData ?? [];
  
  return <MomentumSection featuredEvent={featuredEvent} upcomingEvents={events} />;
}

export default async function Home() {
  const homeHero = await getSetting<any>("home_hero");
  const homeFoundation = await getSetting<any>("home_foundation");
  const homeBuilders = await getSetting<any>("home_builders");
  const homeArtifacts = await getSetting<any>("home_artifacts");

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. The Genesis (Hero) */}
      <HeroSection heroData={homeHero} />

      {/* 2. The Foundation */}
      <FoundationSection foundationData={homeFoundation} />

      {/* 3. The Artifacts */}
      <ArtifactsSection artifactsData={homeArtifacts} />

      {/* 4. Momentum (Replaces Activity + Events) */}
      <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-apyx-purple border-t-transparent rounded-full animate-spin"></div></div>}>
        <MomentumDataFetcher />
      </Suspense>

      {/* 5. Builders (Replaces Gallery) */}
      <BuildersSection buildersData={homeBuilders} />

      {/* 6. Threshold (Replaces JoinCTA) */}
      <ThresholdSection />
    </div>
  );
}
