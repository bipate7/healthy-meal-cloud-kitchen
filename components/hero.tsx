"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Leaf, Award, Clock, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-orange-500/5 to-background">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 left-10 w-32 h-32 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 ${
            mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div
          className={`absolute bottom-20 right-10 w-32 h-32 sm:w-72 sm:h-72 bg-orange-500/10 rounded-full blur-3xl transition-all duration-1000 delay-200 ${
            mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          style={{ animation: "float 8s ease-in-out infinite reverse" }}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
            mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          style={{ animation: "pulse 4s ease-in-out infinite" }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-20 md:py-28 lg:py-32 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            <div
              className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-orange-500/10 border-2 border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold">100% Fresh & Organic Ingredients</span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight transition-all duration-700 delay-100 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Healthy Meals
              <span className="block bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent mt-2 animate-gradient">
                Delivered Fresh Daily
              </span>
            </h1>

            {/* Description */}
            <p
              className={`text-base sm:text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed px-4 transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Chef-prepared, nutritionist-approved meals made with premium ingredients. Start your wellness journey with
              delicious food that fuels your body.
            </p>

            <div
              className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-muted-foreground px-4 transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-2 hover:text-primary transition-colors group">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:scale-125 transition-transform" />
                <span className="whitespace-nowrap font-medium">Award Winning</span>
              </div>
              <div className="flex items-center gap-2 hover:text-primary transition-colors group">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:scale-125 transition-transform" />
                <span className="whitespace-nowrap font-medium">30-Min Delivery</span>
              </div>
              <div className="flex items-center gap-2 hover:text-primary transition-colors group">
                <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:scale-125 transition-transform" />
                <span className="whitespace-nowrap font-medium">Organic Certified</span>
              </div>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 transition-all duration-700 delay-400 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto text-base h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 shadow-lg hover:shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/menu">Browse Menu</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base h-12 sm:h-14 px-6 sm:px-8 border-2 bg-transparent hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/subscriptions">View Plans</Link>
              </Button>
            </div>

            {/* Social proof */}
            <p
              className={`text-xs sm:text-sm text-muted-foreground px-4 transition-all duration-700 delay-500 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
            >
              Join <span className="font-bold text-foreground">50,000+</span> happy customers eating healthier
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
}
