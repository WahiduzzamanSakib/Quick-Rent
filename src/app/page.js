import Image from "next/image";
import TrustBadges from "./components/TrustBadges";
import HeroBanner from "./components/HeroBanner";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TrustBadges />
    </div>
  );
}
