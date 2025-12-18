"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Flame, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const meals = [
  {
    id: 1,
    name: "Grilled Tandoori Salmon",
    description: "Fresh salmon marinated in yogurt, spices with quinoa and roasted vegetables",
    image: "/grilled-salmon-bowl.jpg",
    calories: 520,
    protein: 42,
    prepTime: 5,
    rating: 4.8,
    reviews: 156,
    tags: ["High Protein", "Omega-3"],
    category: "Lunch",
    price: 399,
  },
  {
    id: 2,
    name: "Healthy Chicken Tikka Bowl",
    description: "Tandoori chicken tikka with brown rice, chickpeas and mint chutney",
    image: "/mediterranean-chicken.jpg",
    calories: 480,
    protein: 38,
    prepTime: 5,
    rating: 4.9,
    reviews: 203,
    tags: ["Low Carb", "High Protein"],
    category: "Dinner",
    price: 299,
  },
  {
    id: 3,
    name: "Paneer Tikka Masala Bowl",
    description: "Grilled paneer in rich tomato gravy with brown rice and salad",
    image: "/thai-tofu-curry.jpg",
    calories: 440,
    protein: 22,
    prepTime: 5,
    rating: 4.7,
    reviews: 128,
    tags: ["Vegetarian", "High Protein"],
    category: "Lunch",
    price: 249,
  },
  {
    id: 4,
    name: "Protein Poha Bowl",
    description: "Healthy poha with sprouts, peanuts, vegetables and boiled eggs",
    image: "/breakfast-power-bowl.jpg",
    calories: 380,
    protein: 28,
    prepTime: 3,
    rating: 4.9,
    reviews: 241,
    tags: ["High Protein", "Breakfast"],
    category: "Breakfast",
    price: 149,
  },
]

export function MenuPreview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section
      id="menu"
      className="py-20 bg-gradient-to-br from-muted/30 via-background to-primary/5 relative overflow-hidden"
    >
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
              This Week's Menu
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">Fresh meals crafted daily by our expert chefs</p>
          </div>
          <Button
            variant="outline"
            asChild
            className="hidden md:inline-flex bg-transparent hover:bg-primary hover:text-white transition-all duration-300 border-2 hover:border-primary"
          >
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {meals.map((meal, index) => (
            <Card
              key={meal.id}
              className={`overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 ${
                hoveredId === meal.id ? "scale-105 z-20" : ""
              }`}
              onMouseEnter={() => setHoveredId(meal.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideInUp 0.6s ease-out forwards",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={meal.image || "/placeholder.svg"}
                  alt={meal.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-foreground hover:bg-white shadow-lg animate-fadeIn">
                  {meal.category}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-3 md:p-4">
                <h3 className="font-semibold text-base md:text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                  {meal.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{meal.description}</p>

                <div className="flex gap-2 mb-3 flex-wrap">
                  {meal.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 md:h-4 md:w-4 text-orange-500" />
                    <span>{meal.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                    <span>{meal.prepTime} min</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-sm md:text-base">{meal.rating}</span>
                  <span className="text-xs md:text-sm text-muted-foreground">({meal.reviews})</span>
                </div>

                <div className="mt-2 text-lg font-bold text-primary">₹{meal.price}</div>
              </CardContent>
              <CardFooter className="p-3 md:p-4 pt-0">
                <Button className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 transition-all duration-300 group-hover:shadow-lg text-sm md:text-base">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild className="hover:bg-primary hover:text-white transition-all bg-transparent">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
