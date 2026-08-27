import { BigBrands } from "@/components/sections/BigBrands";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Fork } from "@/components/sections/Fork";
import { Guarantee } from "@/components/sections/Guarantee";
import { Hero } from "@/components/sections/Hero";
import { Modules } from "@/components/sections/Modules";
import { Outcomes } from "@/components/sections/Outcomes";
import { Pricing } from "@/components/sections/Pricing";
import { Speed } from "@/components/sections/Speed";
import { Story } from "@/components/sections/Story";
import { SystemIntro } from "@/components/sections/SystemIntro";
import { Testimonials } from "@/components/sections/Testimonials";
import { StickyCta } from "@/components/ui/StickyCta";

/**
 * Ads2Sawa sales page.
 *
 * Order is the argument: promise → proof → problem → mechanism → offer →
 * evidence → price → risk reversal → decision → objections → last call.
 * Every section is self-contained and reads its copy from `src/content`.
 */
export default function Page() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Outcomes />
        <Story />
        <BigBrands />
        <Speed />
        <SystemIntro />
        <Modules />
        <Testimonials />
        <CaseStudy />
        <Pricing />
        <Guarantee />
        <Fork />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
