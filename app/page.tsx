import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { AdvertisementBanner } from "@/components/advertisement-banner";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { CategoryShowcase } from "@/components/category-showcase";
import { MenuPreview } from "@/components/menu-preview";
import { NutritionSection } from "@/components/nutrition-section";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { AppPromo } from "@/components/app-promo";
import { ChefSection } from "@/components/chef-section";
import { FAQ } from "@/components/faq";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { DietaryFilters } from "@/components/dietary-filters";
import { LiveKitchenStatus } from "@/components/live-kitchen-status";
import { MealQuiz } from "@/components/meal-quiz";
import { LoyaltyProgram } from "@/components/loyalty-program";
import { LimitedTimeOffers } from "@/components/limited-time-offers";
import { TrustBadges } from "@/components/trust-badges";
import { InstagramFeed } from "@/components/instagram-feed";
import { ReferralProgram } from "@/components/referral-program";
import { CorporateCatering } from "@/components/corporate-catering";
import { getMeals } from "@/app/actions/meals";
import { getCurrentUser } from "@/lib/auth";
import { getCart } from "@/app/actions/cart";

export default async function Home() {
  const user = await getCurrentUser();
  const cart = await getCart();
  const cartCount = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  let weeklyMenu: any[] = [];
  try {
    const meals = await getMeals({ sort: "popular" });
    weeklyMenu = meals.slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch menu:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} cartCount={cartCount} />
      <Hero />
      <AdvertisementBanner />
      <LiveKitchenStatus />
      <Features />
      <DietaryFilters />
      <CategoryShowcase />
      <LimitedTimeOffers />
      <HowItWorks />
      <MenuPreview initialMeals={weeklyMenu} />
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
  );
}
