import { Card } from "@/components/ui/card"
import { Activity, Heart, Zap, Shield } from "lucide-react"

const benefits = [
  {
    icon: Activity,
    title: "Balanced Macros",
    description: "Perfect protein, carbs, and fats ratio in every meal",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Heart,
    title: "Heart Healthy",
    description: "Low sodium, good fats, and cholesterol-friendly ingredients",
    color: "text-red-500 bg-red-50",
  },
  {
    icon: Zap,
    title: "Energy Boost",
    description: "Nutrient-dense foods that keep you energized all day",
    color: "text-amber-500 bg-amber-50",
  },
  {
    icon: Shield,
    title: "Immune Support",
    description: "Rich in vitamins, minerals, and antioxidants",
    color: "text-blue-500 bg-blue-50",
  },
]

export function NutritionSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance">
            Nutrition <span className="text-secondary">That Works</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-4">
            Every meal is carefully crafted by nutritionists to support your health goals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.title}
              className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${benefit.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <benefit.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3">{benefit.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
