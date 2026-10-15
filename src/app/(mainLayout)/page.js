import FAQ from "@/components/staticComponents/FAQ";
import ApprovedLimirCard from "@/components/fetureProperties/ApprovedLimirCard";
import FinalCTA from "@/components/staticComponents/FinalCTA";
import RecentlyAddPage from "@/components/RecentlyAdd,";
import HeroBanner from "@/components/staticComponents/HeroBanner";
import StatsSection from "@/components/staticComponents/StatsSection";
import TestimonialsSection from "@/components/staticComponents/TestimonialsSection";
import TopLocations from "@/components/staticComponents/TopLocations";
import TrustBadges from "@/components/staticComponents/TrustBadges";
import HowItWorks from "@/components/staticComponents/HowItWorks";


export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TrustBadges />
      <ApprovedLimirCard />
      <StatsSection />
      <RecentlyAddPage />
      <HowItWorks />
      <TopLocations />
      <TestimonialsSection />
         <FAQ />
      <FinalCTA />
    </div>
  );
}
