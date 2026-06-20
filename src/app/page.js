import HeroBanner from "./components/staticComponents/HeroBanner";
import StatsSection from "./components/staticComponents/StatsSection";
import TestimonialsSection from "./components/staticComponents/TestimonialsSection";
import TopLocations from "./components/staticComponents/TopLocations";
import TrustBadges from "./components/staticComponents/TrustBadges";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TrustBadges />
      <StatsSection />
      <TopLocations />
      <TestimonialsSection />
    </div>
  );
}
