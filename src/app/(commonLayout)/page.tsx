import { CategoriesSection } from "@/components/modules/homepage/categories-section";
import { MedicinesSection } from "@/components/modules/homepage/medicines-section";
import { HeroSection } from "@/components/modules/homepage/hero-section";
import { TrustAndProcessSection } from "@/components/modules/homepage/trust-process-section";
import { StatisticsSection } from "@/components/modules/homepage/statistics-section";
import { TestimonialsSection } from "@/components/modules/homepage/testimonials-section";
import { NewsletterSection } from "@/components/modules/homepage/newsletter-section";
import { FAQSection } from "@/components/modules/homepage/faq-section";

export default async function Home() {
  return (
    <div className="max-w-8xl mx-auto gap-6">
      <HeroSection />
      <div className="bg-slate-50 dark:bg-slate-800">
        <CategoriesSection />
        <MedicinesSection />
        <TrustAndProcessSection />
      </div>
      <StatisticsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />
    </div>
  );
}
