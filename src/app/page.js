import Image from "next/image";
import TrustBadges from "./components/TrustBadges";
import HeroBanner from "./components/HeroBanner";
import TopLocations from "./components/TopLocations";
import StatsSection from "./components/StatsSection";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TrustBadges />
      <StatsSection />
      <TopLocations />
      {/* rivewCard */}
    </div>
  );
}
