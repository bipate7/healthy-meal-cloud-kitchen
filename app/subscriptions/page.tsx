"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, Star, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function SubscriptionsPage() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    cardsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const plans = [
    {
      name: "Starter",
      price: 1299,
      originalPrice: 1499,
      meals: 5,
      icon: Star,
      color: "from-blue-500 to-cyan-500",
      features: [
        "5 meals per week",
        "Choose from 50+ meals",
        "Free delivery",
        "Nutrition tracking",
        "Email support",
        "Cancel anytime",
      ],
      popular: false,
    },
    {
      name: "Popular",
      price: 2299,
      originalPrice: 2799,
      meals: 10,
      icon: TrendingUp,
      color: "from-primary to-emerald-500",
      features: [
        "10 meals per week",
        "Choose from 100+ meals",
        "Priority delivery",
        "Advanced nutrition tracking",
        "WhatsApp support 24/7",
        "Exclusive recipes",
        "Loyalty rewards",
        "Cancel anytime",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: 3999,
      originalPrice: 4999,
      meals: 21,
      icon: Zap,
      color: "from-orange-500 to-amber-500",
      features: [
        "21 meals per week (3 per day)",
        "Choose from all meals",
        "Express delivery",
        "Personal nutritionist consult",
        "Dedicated support manager",
        "Custom meal plans",
        "Premium loyalty rewards",
        "Flexible scheduling",
        "Cancel anytime",
      ],
      popular: false,
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
              Subscription{" "}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Plans</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Save time and money with our weekly meal subscriptions. Get fresh, healthy meals delivered to your door.
            </p>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                data-index={index}
                className={`relative bg-card rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                  plan.popular ? "border-primary scale-105 lg:scale-110" : "border-transparent hover:border-primary/20"
                } ${visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-emerald-500 text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="p-6 md:p-8">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <plan.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{plan.meals} meals per week</p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl md:text-4xl font-bold">₹{plan.price}</span>
                      <span className="text-muted-foreground">/week</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">₹{plan.originalPrice}</span>
                      <span className="text-sm font-semibold text-green-600">
                        Save ₹{plan.originalPrice - plan.price}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      ₹{Math.round(plan.price / plan.meals)} per meal
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full mb-6 ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90"
                        : ""
                    }`}
                    size="lg"
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Why Subscribe?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Users,
                  title: "Save Up to 20%",
                  desc: "Subscribers save more compared to one-time orders",
                },
                {
                  icon: Star,
                  title: "Priority Delivery",
                  desc: "Get your meals delivered first with guaranteed time slots",
                },
                {
                  icon: Zap,
                  title: "Flexible Plans",
                  desc: "Pause, skip, or cancel anytime. No long-term commitments",
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-primary/5 to-orange-500/5 p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <benefit.icon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary to-orange-500 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Not Sure Yet?</h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-white/90 px-4">
              Try our meals with a one-time order first. No commitment required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
                asChild
              >
                <Link href="/menu">Browse Menu</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent w-full sm:w-auto"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
