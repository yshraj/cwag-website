import { AboutSection } from "@/components/cwag/about-section";
import { DistrictsSection } from "@/components/cwag/districts-section";
import { EventsSection } from "@/components/cwag/events-section";
import { HeroSection } from "@/components/cwag/hero-section";
import { NewsSection } from "@/components/cwag/news-section";
import { SportsSection } from "@/components/cwag/sports-section";
import { StatsSection } from "@/components/cwag/stats-section";
import { WorkSection } from "@/components/cwag/work-section";

export default function Home() {
  return (
    <>
      {/* 1. Hero: Photography-led introduction */}
      <HeroSection />
      
      {/* 2. About: Organization introduction & pillars */}
      <AboutSection />
      
      {/* 3. Our Work: Documented advocacy (Aug 2024) */}
      <WorkSection />
      
      {/* 4. Stats: Inspirational quote with context */}
      <StatsSection />
      
      {/* 5. Sports: Disciplines covered */}
      <SportsSection />
      
      {/* 6. Districts: Geographic coverage */}
      <DistrictsSection />
      
      {/* 7. News: Verified updates */}
      <NewsSection />
      
      {/* 8. Events: Future events placeholder */}
      <EventsSection />
    </>
  );
}
