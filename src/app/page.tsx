import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesAlternating } from "@/components/sections/ServicesAlternating";
import { TechShowcaseModal } from "@/components/sections/TechShowcaseModal";
import { TechComparison } from "@/components/sections/TechComparison";
import { AlgorithmSection } from "@/components/sections/AlgorithmSection";
import { AiCloserSimulation } from "@/components/sections/AiCloserSimulation";
import { ProjectTeaser } from "@/components/sections/ProjectTeaser";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { InteractiveFunnel } from "@/components/sections/InteractiveFunnel";

const Home = () => {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      {/* 1. Hero Sektion (Start) */}
      <HeroSection />
      <SocialProofSection />

      {/* 2. ProcessSection (Ablauf in 3 Schritten) */}
      <ProcessSection />

      {/* 3. ServicesAlternating (Die 5 Leistungen) */}
      <ServicesAlternating />

      {/* 4. TechShowcase (Live-Simulator) */}
      <TechShowcaseModal />

      {/* 5. TechComparison (Agentur-Vergleich & Performance) */}
      <TechComparison />

      {/* 6. AlgorithmSection (Social Media & Psychologie) */}
      <AlgorithmSection />

      {/* 7. AiCloserSimulation (Chat-Simulator) */}
      <AiCloserSimulation />

      {/* 8. ProjectTeaser (Beweise / Case Studies) */}
      <ProjectTeaser />

      {/* 9. InteractiveFunnel (Abschluss / Rechner) */}
      <InteractiveFunnel />

      {/* 10. Benefits, FAQ & CTA (Vertrauen aufbauen) */}
      <BenefitsSection />
      <FaqSection />
      <CtaBanner />
    </main>
  );
};

export default Home;
