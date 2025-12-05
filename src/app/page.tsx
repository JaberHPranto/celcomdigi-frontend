import { AnnouncementBanner } from "@/components/sections/announcement-banner";
import { FloatingBanner } from "@/components/sections/floating-banner";
import { SiteFooter } from "@/components/sections/footer";
import { HelpResources } from "@/components/sections/help-resources";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { OneUltraHighlight } from "@/components/sections/one-ultra-highlight";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { PromotionsCarousel } from "@/components/sections/promotions-carousel";
import { QuickActions } from "@/components/sections/quick-actions";
import { ServicesGrid } from "@/components/sections/services-grid";
import { SpotlightBanner } from "@/components/sections/spotlight-banner";
import { SpotlightGrid } from "@/components/sections/spotlight-grid";
import { VideoSpotlight } from "@/components/sections/video-spotlight";
import { ToolActionVisuals } from "@/components/voice-chat/tool-action-visuals";
import { easy360Products, megaJimatProducts } from "@/data/site-content";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <AnnouncementBanner />
      <QuickActions />
      <HeroCarousel />
      <SpotlightBanner />
      <OneUltraHighlight />
      <SpotlightGrid />
      <ProductCarousel
        id="easy360"
        title="Bestsellers on Easy360"
        ctaLabel="View all devices"
        ctaHref="/devices/easy360"
        products={easy360Products}
      />
      <ProductCarousel
        id="megajimat"
        title="Bestsellers on Pakej MegaJimat"
        ctaLabel="View all devices"
        ctaHref="/devices/pakej-megajimat"
        products={megaJimatProducts}
      />
      <PromotionsCarousel />
      <ServicesGrid />
      <VideoSpotlight />
      <HelpResources />
      <SiteFooter />
      <FloatingBanner />
    </main>
  );
}
