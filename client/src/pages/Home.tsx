import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FundingCategories from "@/components/FundingCategories";
import FeaturedLenders from "@/components/FeaturedLenders";
import BetterList from "@/components/BetterList";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SitemapFooter from "@/components/SitemapFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FundingCategories />
        <FeaturedLenders />
        <BetterList />
        <Testimonials />
        <CTASection />
      </main>
      <SitemapFooter />
    </div>
  );
}
