"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart, ChefHat, Truck, Heart, Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function HowItWorksPage() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleSteps((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    stepsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      icon: ShoppingCart,
      title: "Choose Your Meals",
      description:
        "Browse our menu of nutritionist-approved meals and select what you love. Filter by dietary preferences, cuisine type, or nutritional goals.",
      color: "from-primary to-emerald-500",
      features: ["100+ meal options", "Custom dietary filters", "Save favorites"],
    },
    {
      icon: ChefHat,
      title: "We Cook Fresh",
      description:
        "Our expert chefs prepare your meals with premium ingredients in our hygiene-certified cloud kitchens. Every meal is cooked fresh to order.",
      color: "from-orange-500 to-amber-500",
      features: ["FSSAI certified kitchens", "Fresh ingredients daily", "No preservatives"],
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Your meals are packed in eco-friendly containers and delivered to your doorstep within 30-45 minutes, ensuring maximum freshness.",
      color: "from-yellow-500 to-orange-400",
      features: ["30-45 min delivery", "Real-time tracking", "Eco-friendly packaging"],
    },
    {
      icon: Heart,
      title: "Enjoy & Repeat",
      description:
        "Heat and eat! Enjoy delicious, healthy meals that fuel your body. Save favorites and reorder with just one click.",
      color: "from-pink-500 to-rose-500",
      features: ["Easy reordering", "Meal history", "Loyalty rewards"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              How{" "}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                It Works
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              From farm to table in four simple steps. Healthy eating has never been this easy!
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    stepsRef.current[index] = el
                  }}
                  data-index={index}
                  className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  } transition-all duration-700 ${
                    visibleSteps.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mb-4 md:mb-6 transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg`}
                    >
                      <step.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <div className="flex items-start md:items-center gap-3 md:gap-4 mb-4">
                      <div
                        className={`text-4xl md:text-6xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">{step.title}</h2>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm md:text-base">
                          <Check className={`h-5 w-5 text-primary flex-shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <img
                      src={`/.jpg?height=400&width=600&query=${step.title.toLowerCase()} healthy meal delivery indian`}
                      alt={step.title}
                      className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-3xl p-6 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
              Why Choose HealthyMeal?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  title: "Save Time",
                  desc: "No meal planning, grocery shopping, or cooking. Get hours back in your week.",
                },
                {
                  title: "Nutritionist Approved",
                  desc: "Every meal is designed by certified nutritionists for optimal health benefits.",
                },
                {
                  title: "Flexible Plans",
                  desc: "Choose from one-time orders or subscription plans. Cancel anytime, no commitments.",
                },
                {
                  title: "Fresh Ingredients",
                  desc: "We source locally from trusted suppliers and use only the freshest ingredients.",
                },
                {
                  title: "Affordable Pricing",
                  desc: "Premium quality at reasonable prices. Starting from just ₹149 per meal.",
                },
                {
                  title: "24/7 Support",
                  desc: "Our customer support team is always ready to help you with any questions.",
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="bg-background p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Get Started?</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 px-4">
              Join thousands of health-conscious Indians who trust HealthyMeal for their daily nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 w-full sm:w-auto"
                asChild
              >
                <Link href="/menu">Browse Menu</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                <Link href="/subscriptions">View Plans</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
