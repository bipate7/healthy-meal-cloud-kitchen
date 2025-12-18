"use client"

import { Leaf, Wheat, Milk, Fish, Flame, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const filters = [
  {
    name: "Vegan",
    icon: Leaf,
    color: "bg-green-500",
    count: 45,
    description: "Plant-based meals",
  },
  {
    name: "Gluten-Free",
    icon: Wheat,
    color: "bg-amber-500",
    count: 38,
    description: "No gluten ingredients",
  },
  {
    name: "Dairy-Free",
    icon: Milk,
    color: "bg-blue-500",
    count: 32,
    description: "Lactose-free options",
  },
  {
    name: "High Protein",
    icon: Flame,
    color: "bg-red-500",
    count: 52,
    description: "30g+ protein per meal",
  },
  {
    name: "Low Carb",
    icon: Heart,
    color: "bg-pink-500",
    count: 41,
    description: "Keto-friendly meals",
  },
  {
    name: "Pescatarian",
    icon: Fish,
    color: "bg-cyan-500",
    count: 28,
    description: "Fish & plant-based",
  },
]

export function DietaryFilters() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">Dietary Preferences</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Made for <span className="text-green-600">Your Lifestyle</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Filter meals by your dietary needs. Every meal is clearly labeled for easy selection.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filters.map((filter, index) => {
            const Icon = filter.icon
            return (
              <button
                key={filter.name}
                className="group relative p-6 rounded-2xl border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                  opacity: 0,
                }}
              >
                <div
                  className={`${filter.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{filter.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{filter.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {filter.count} meals
                </Badge>
              </button>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
