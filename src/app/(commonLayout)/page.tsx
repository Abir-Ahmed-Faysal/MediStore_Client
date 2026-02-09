import { CategoriesSection } from "@/components/modules/homepage/categories-section";

import { MedicinesSection } from "@/components/modules/homepage/medicines-section";
import { HeroSection } from "@/components/modules/homepage/hero-section";
import { TrustAndProcessSection } from "@/components/modules/homepage/trust-process-section";

export default async function Home() {
  return (
    <div className="max-w-8xl mx-auto  gap-6">
      <HeroSection />
      <div className="bg-slate-50">
        <CategoriesSection />
        <MedicinesSection />
        <TrustAndProcessSection />
      </div>
    </div>
  );
}
