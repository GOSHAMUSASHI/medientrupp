import { HeroSection } from "@/components/sections/HeroSection";
import dynamic from "next/dynamic";

const SocialProofSection = dynamic(() => import("@/components/sections/SocialProofSection").then(m => m.SocialProofSection));
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(m => m.ProcessSection));
const IcebergSection = dynamic(() => import("@/components/sections/IcebergSection").then(m => m.IcebergSection));
const ServicesAlternating = dynamic(() => import("@/components/sections/ServicesAlternating").then(m => m.ServicesAlternating));
const BenefitsSection = dynamic(() => import("@/components/sections/BenefitsSection").then(m => m.BenefitsSection));
const CasesPreviewSection = dynamic(() => import("@/components/sections/CasesPreviewSection").then(m => m.CasesPreviewSection));
const InteractiveFunnel = dynamic(() => import("@/components/sections/InteractiveFunnel").then(m => m.InteractiveFunnel));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection").then(m => m.FaqSection));
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner").then(m => m.CtaBanner));

const Home = () => {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <SocialProofSection />
      <ProcessSection />
      <IcebergSection />
      <ServicesAlternating />
      <BenefitsSection />
      <CasesPreviewSection />
      <InteractiveFunnel />
      <FaqSection />
      <CtaBanner />
    </main>
  );
};

export default Home;
