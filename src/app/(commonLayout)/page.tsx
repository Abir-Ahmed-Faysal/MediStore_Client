import { CategoriesSection } from "@/components/modules/homepage/categories-section";
import { FeaturedMedicinesSection } from "@/components/modules/homepage/featured-medicines-section";
import { HeroSection } from "@/components/modules/homepage/hero-section";
import { TrustAndProcessSection } from "@/components/modules/homepage/trust-process-section";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto  gap-6">
      <HeroSection />
      <CategoriesSection />
      <FeaturedMedicinesSection />
      <TrustAndProcessSection />
    </div>
  );
}
