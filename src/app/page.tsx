import { HeroSection } from "@/components/home/HeroSection";
import { BestSellers } from "@/components/home/BestSellers";
import { CustomServicesSection } from "@/components/home/CustomServicesSection";
import { AboutUsSection } from "@/components/home/AboutUsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { ContactUsSection } from "@/components/home/ContactUsSection";
import { getJacketCatalog } from "@/lib/jackets/catalog";

export default function HomePage() {
  const jackets = getJacketCatalog();

  return (
    <>
      <HeroSection />
      <CustomServicesSection />
      <BestSellers jackets={jackets} />
      <AboutUsSection />
      <WhyChooseUsSection />
      <ContactUsSection />
    </>
  );
}
