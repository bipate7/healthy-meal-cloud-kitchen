import { Card } from "@/components/ui/card"
import { Salad, Flame, Fish, Leaf, Soup, Drumstick } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "North Indian",
    icon: Flame,
    color: "from-red-400 to-orange-500",
    count: "30+ meals",
  },
  {
    name: "South Indian",
    icon: Soup,
    color: "from-green-400 to-emerald-500",
    count: "25+ meals",
  },
  {
    name: "High Protein",
    icon: Drumstick,
    color: "from-red-400 to-rose-500",
    count: "35+ meals",
  },
  {
    name: "Vegetarian",
    icon: Leaf,
    color: "from-lime-400 to-green-500",
    count: "28+ meals",
  },
  {
    name: "Regional",
    icon: Salad,
    color: "from-yellow-400 to-orange-500",
    count: "20+ meals",
  },
  {
    name: "Seafood",
    icon: Fish,
    color: "from-blue-400 to-cyan-500",
    count: "18+ meals",
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance">
            Explore Regional <span className="text-primary">Cuisines</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-4">
            From North Indian curries to South Indian idlis, discover authentic flavors from across India
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => (
            <Link href={`/meals?category=${category.name.toLowerCase()}`} key={category.name}>
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden h-full border-2 hover:border-primary/30">
                <div className="p-4 sm:p-6 flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <category.icon className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 text-balance leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{category.count}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
