"use client"

import { Leaf, Clock, Award, Heart } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Locally sourced, organic produce delivered daily to ensure maximum freshness and nutrition.",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Ready-to-eat meals or simple prep instructions. Enjoy restaurant-quality food in minutes.",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Award,
    title: "Chef-Crafted",
    description: "Every meal is designed by professional chefs and nutritionists for optimal taste and health.",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Heart,
    title: "Nutritionally Balanced",
    description: "Perfectly portioned meals with complete macro and micro nutrient information.",
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-500/10",
  },
]

export function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-500" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
            Why Choose HealthyMeal?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            We make healthy eating simple, delicious, and convenient for your busy lifestyle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center text-center group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative mb-6">
                <div
                  className={`h-20 w-20 md:h-24 md:w-24 ${feature.bgColor} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300`}
                  />
                  <feature.icon className="h-10 w-10 md:h-12 md:w-12 text-primary group-hover:text-white relative z-10 transition-colors duration-300" />
                </div>
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl -z-10 animate-pulse" />
                )}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed px-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
