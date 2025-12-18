"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Working Professional, Mumbai",
    image: "/woman-portrait.png",
    rating: 5,
    text: "HealthyMeal ने मेरी ज़िन्दगी बदल दी! As a working mom in Mumbai, I barely have time to cook, but I want my family to eat healthy Indian meals. The paneer tikka bowl and chicken biryani are absolutely delicious!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Fitness Enthusiast, Delhi",
    image: "/thoughtful-man-portrait.png",
    rating: 5,
    text: "Perfect for my fitness journey! Every meal has exact macros, high protein content, and authentic Indian flavors. I've lost 12 kgs in 3 months with HealthyMeal. Highly recommend the chicken seekh bowls!",
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Nutritionist, Bangalore",
    image: "/woman-portrait-2.png",
    rating: 5,
    text: "I recommend HealthyMeal to all my clients across India. The meals are balanced, use quality ingredients, and taste authentic. Finally, a cloud kitchen that understands Indian nutrition needs!",
  },
]

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
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
      id="testimonials"
      className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Join thousands of satisfied customers who have transformed their eating habits.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="h-20 w-20" />
              </div>

              <CardContent className="p-6 relative z-10">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 fill-yellow-400 text-yellow-400 transition-all duration-300 ${
                        hoveredId === testimonial.id ? "scale-125" : ""
                      }`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-base md:text-lg">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>

              {hoveredId === testimonial.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5 pointer-events-none" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
