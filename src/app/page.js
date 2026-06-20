import Image from "next/image";
import TrustBadges from "./components/TrustBadges";
import HeroBanner from "./components/HeroBanner";
import TopLocations from "./components/TopLocations";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TrustBadges />
      <TopLocations />
      {/* rivewCard */}
    </div>
  );
}
