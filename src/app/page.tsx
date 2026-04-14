import { HeroSection } from "@/components/sections/HeroSection";
import dynamic from "next/dynamic";

const SocialProofSection = dynamic(() => import("@/components/sections/SocialProofSection").then(m => m.SocialProofSection));
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(m => m.ProcessSection));
const ServicesAlternating = dynamic(() => import("@/components/sections/ServicesAlternating").then(m => m.ServicesAlternating));
const TechShowcaseModal = dynamic(() => import("@/components/sections/TechShowcaseModal").then(m => m.TechShowcaseModal));
const TechComparison = dynamic(() => import("@/components/sections/TechComparison").then(m => m.TechComparison));
const AlgorithmSection = dynamic(() => import("@/components/sections/AlgorithmSection").then(m => m.AlgorithmSection));
const AiCloserSimulation = dynamic(() => import("@/components/sections/AiCloserSimulation").then(m => m.AiCloserSimulation));
const ProjectTeaser = dynamic(() => import("@/components/sections/ProjectTeaser").then(m => m.ProjectTeaser));
const BenefitsSection = dynamic(() => import("@/components/sections/BenefitsSection").then(m => m.BenefitsSection));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection").then(m => m.FaqSection));
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner").then(m => m.CtaBanner));
const InteractiveFunnel = dynamic(() => import("@/components/sections/InteractiveFunnel").then(m => m.InteractiveFunnel));
const IcebergSection = dynamic(() => import("@/components/sections/IcebergSection").then(m => m.IcebergSection));

const Home = () => {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      {/* 1. Hero Sektion (Start) */}
      <HeroSection />
      <SocialProofSection />

      {/* 2. ProcessSection (Ablauf in 3 Schritten) */}
      <ProcessSection />

      {/* 2.5 IcebergSection (Split: Sichtbar vs Unsichtbar) */}
      <IcebergSection />

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

      {/* 9. BenefitsSection — vor dem Rechner, damit Benefits den Preis bestätigen */}
      <BenefitsSection />

      {/* 10. InteractiveFunnel (Abschluss / Rechner) */}
      <InteractiveFunnel />

      {/* 11. FAQ & finaler CTA */}
      <FaqSection />
      <CtaBanner />
    </main>
  );
};

export default Home;
