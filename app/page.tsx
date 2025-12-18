import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AdvertisementBanner } from "@/components/advertisement-banner"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { CategoryShowcase } from "@/components/category-showcase"
import { MenuPreview } from "@/components/menu-preview"
import { NutritionSection } from "@/components/nutrition-section"
import { Stats } from "@/components/stats"
import { Testimonials } from "@/components/testimonials"
import { AppPromo } from "@/components/app-promo"
import { ChefSection } from "@/components/chef-section"
import { FAQ } from "@/components/faq"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { DietaryFilters } from "@/components/dietary-filters"
import { LiveKitchenStatus } from "@/components/live-kitchen-status"
import { MealQuiz } from "@/components/meal-quiz"
import { LoyaltyProgram } from "@/components/loyalty-program"
import { LimitedTimeOffers } from "@/components/limited-time-offers"
import { TrustBadges } from "@/components/trust-badges"
import { InstagramFeed } from "@/components/instagram-feed"
import { ReferralProgram } from "@/components/referral-program"
import { CorporateCatering } from "@/components/corporate-catering"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <AdvertisementBanner />
      <LiveKitchenStatus />
      <Features />
      <DietaryFilters />
      <CategoryShowcase />
      <LimitedTimeOffers />
      <HowItWorks />
      <MenuPreview />
      <NutritionSection />
      <MealQuiz />
      <Stats />
      <TrustBadges />
      <ChefSection />
      <Testimonials />
      <InstagramFeed />
      <LoyaltyProgram />
      <CorporateCatering />
      <AppPromo />
      <ReferralProgram />
      <FAQ />
      <Newsletter />
      <Footer />
    </div>
  )
}
