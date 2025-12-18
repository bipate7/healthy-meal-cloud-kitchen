"use client"

import { Users, Star, Salad, Award } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const stats = [
  {
    icon: Users,
    value: 100000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: Salad,
    value: 5000000,
    suffix: "+",
    label: "Meals Delivered",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "",
    label: "Average Rating",
  },
  {
    icon: Award,
    value: 25,
    suffix: "+",
    label: "Cities Served",
  },
]

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    stats.forEach((stat, index) => {
      const duration = 2000
      const steps = 60
      const increment = stat.value / steps
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        if (currentStep <= steps) {
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = Math.min(increment * currentStep, stat.value)
            return newCounts
          })
        } else {
          clearInterval(timer)
        }
      }, duration / steps)
    })
  }, [isVisible])

  const formatValue = (value: number, originalValue: number) => {
    if (originalValue >= 1000000) {
      return (value / 1000000).toFixed(1) + "M"
    } else if (originalValue >= 1000) {
      return (value / 1000).toFixed(0) + "K"
    } else {
      return value.toFixed(1)
    }
  }

  return (
    <section
      className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-orange-600 text-white relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center group transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-4">
                <stat.icon className="h-10 w-10 md:h-12 md:w-12 opacity-90 group-hover:scale-125 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                {formatValue(counts[index], stat.value)}
                {stat.suffix}
              </div>
              <div className="text-white/90 text-xs sm:text-sm md:text-base font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
