"use client"

import { Search, Calendar, Truck, UtensilsCrossed } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Choose Your Meals",
    description: "Browse our weekly menu and select meals that fit your dietary preferences and goals.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Set Your Schedule",
    description: "Pick your delivery days and times that work best for your schedule.",
  },
  {
    icon: Truck,
    step: "03",
    title: "We Deliver",
    description: "Fresh meals arrive at your door in eco-friendly, insulated packaging.",
  },
  {
    icon: UtensilsCrossed,
    step: "04",
    title: "Heat & Enjoy",
    description: "Simply heat and enjoy restaurant-quality meals in minutes.",
  },
]

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
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
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-primary/5 via-background to-orange-500/5"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">From selection to satisfaction in four simple steps.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`relative transition-all duration-700 delay-${index * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="h-20 w-20 bg-gradient-to-br from-primary via-primary to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 h-8 w-8 bg-white border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary shadow-md z-10 group-hover:scale-125 transition-transform">
                    {step.step}
                  </span>
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all duration-300 -z-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary via-orange-500/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
