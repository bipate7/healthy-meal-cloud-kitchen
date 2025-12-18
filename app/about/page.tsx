"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Leaf, ChefHat, Award, Users, TrendingUp } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleSections((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 },
    )

    sectionsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                HealthyMeal
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4">
              We're on a mission to make healthy eating convenient, delicious, and accessible to everyone across India.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section
          ref={(el) => {
            sectionsRef.current[0] = el
          }}
          data-index={0}
          className={`container mx-auto px-4 py-12 md:py-16 transition-all duration-700 ${
            visibleSections.includes(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="/indian-chef-cooking-healthy-meals-in-modern-kitche.jpg"
                  alt="Our Kitchen"
                  className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-4 md:space-y-6 order-1 md:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Our Story</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Founded in 2020, HealthyMeal was born from a simple idea: healthy food doesn't have to be boring or
                  time-consuming. Our founders, Priya and Rahul, noticed how difficult it was for busy professionals to
                  maintain a nutritious diet.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Starting from a small cloud kitchen in Mumbai, we've grown to serve over 1 lakh happy customers across
                  25+ cities in India. Every meal is crafted with love, using locally-sourced organic ingredients and
                  traditional Indian recipes with a healthy twist.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="text-2xl md:text-3xl font-bold text-primary">50L+</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Meals Delivered</div>
                  </div>
                  <div className="bg-orange-500/5 p-4 rounded-lg hover:bg-orange-500/10 transition-colors">
                    <div className="text-2xl md:text-3xl font-bold text-orange-500">25+</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Cities Served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          ref={(el) => {
            sectionsRef.current[1] = el
          }}
          data-index={1}
          className={`container mx-auto px-4 py-12 md:py-16 transition-all duration-700 ${
            visibleSections.includes(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-3xl p-6 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Heart,
                  color: "from-primary to-emerald-500",
                  title: "Health First",
                  desc: "Every recipe is designed by nutritionists to ensure balanced macros and maximum nutrition.",
                },
                {
                  icon: Leaf,
                  color: "from-orange-500 to-amber-500",
                  title: "Sustainability",
                  desc: "We source locally, use eco-friendly packaging, and minimize food waste in our operations.",
                },
                {
                  icon: ChefHat,
                  color: "from-yellow-500 to-orange-400",
                  title: "Authenticity",
                  desc: "Traditional Indian flavors meet modern nutrition science in every delicious bite.",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="text-center space-y-4 hover:-translate-y-2 transition-transform duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
                  >
                    <value.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold">{value.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section
          ref={(el) => {
            sectionsRef.current[2] = el
          }}
          data-index={2}
          className={`container mx-auto px-4 py-12 md:py-16 transition-all duration-700 ${
            visibleSections.includes(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Our Achievements</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Award, title: "FSSAI Certified", desc: "All kitchens are FSSAI certified with 5-star ratings" },
                { icon: Users, title: "1L+ Customers", desc: "Trusted by over 1 lakh happy customers" },
                { icon: TrendingUp, title: "98% Satisfaction", desc: "Industry-leading customer satisfaction rate" },
              ].map((achievement, i) => (
                <div
                  key={i}
                  className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border"
                >
                  <achievement.icon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          ref={(el) => {
            sectionsRef.current[3] = el
          }}
          data-index={3}
          className={`container mx-auto px-4 py-12 md:py-16 transition-all duration-700 ${
            visibleSections.includes(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { name: "Priya Sharma", role: "Co-Founder & CEO", image: "/indian-female-ceo-professional.jpg" },
                { name: "Rahul Verma", role: "Co-Founder & COO", image: "/indian-male-coo-professional.jpg" },
                { name: "Chef Arjun", role: "Head Chef", image: "/indian-male-chef.jpg" },
                { name: "Dr. Meera Iyer", role: "Chief Nutritionist", image: "/indian-female-nutritionist.jpg" },
              ].map((member, i) => (
                <div
                  key={i}
                  className="space-y-4 hover:-translate-y-2 transition-transform duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto shadow-lg hover:shadow-xl transition-shadow"
                  />
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">{member.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary to-orange-500 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Join Our Healthy Food Revolution
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-white/90 px-4">
              Start your journey to a healthier lifestyle with delicious, nutritionist-approved meals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
                asChild
              >
                <Link href="/menu">Explore Menu</Link>
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
