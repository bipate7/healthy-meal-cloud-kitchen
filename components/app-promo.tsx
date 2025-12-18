import { Button } from "@/components/ui/button"
import { Smartphone, Bell, Star, Gift } from "lucide-react"
import Link from "next/link"

export function AppPromo() {
  return (
    <section className="py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="text-white space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Gift className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Download Now</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance leading-tight">
                Order Faster with Our Mobile App
              </h2>

              <p className="text-base sm:text-lg text-white/90 text-balance leading-relaxed">
                Get exclusive app-only deals, track your orders in real-time, and earn rewards with every purchase.
              </p>

              <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Real-time Notifications</h3>
                    <p className="text-sm sm:text-base text-white/80">
                      Stay updated on your order status and special offers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Loyalty Rewards</h3>
                    <p className="text-sm sm:text-base text-white/80">
                      Earn points and get free meals with every order
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 h-12 sm:h-14 text-base font-semibold shadow-xl"
                  asChild
                >
                  <Link href="#download">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Download App
                  </Link>
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm text-white/90">
                  <Star className="h-4 w-4 fill-white" />
                  <span className="font-semibold">4.8</span>
                  <span>on App Store</span>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <img src="/mobile-app-mockup-healthy-food.jpg" alt="Mobile App" className="w-full h-auto drop-shadow-2xl" />
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-2xl animate-float" />
                <div
                  className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 bg-white/20 backdrop-blur-sm rounded-2xl animate-float"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
