import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Award } from "lucide-react"

const chefs = [
  {
    name: "Chef Maria Rodriguez",
    specialty: "Mediterranean Cuisine",
    experience: "15+ years",
    image: "/female-chef-professional.jpg",
  },
  {
    name: "Chef James Chen",
    specialty: "Asian Fusion",
    experience: "12+ years",
    image: "/male-asian-chef-professional.jpg",
  },
  {
    name: "Chef Priya Patel",
    specialty: "Plant-Based Nutrition",
    experience: "10+ years",
    image: "/indian-female-chef-professional.jpg",
  },
]

export function ChefSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 sm:mb-6">
            <ChefHat className="h-4 w-4" />
            <span>Meet Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance">
            Award-Winning <span className="text-primary">Chefs</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-4">
            Our culinary experts bring passion, expertise, and creativity to every dish
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
          {chefs.map((chef, index) => (
            <Card
              key={chef.name}
              className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={chef.image || "/placeholder.svg"}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-lg sm:text-xl mb-2">{chef.name}</h3>
                <Badge className="mb-3 text-xs sm:text-sm" variant="secondary">
                  {chef.specialty}
                </Badge>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  {chef.experience} Experience
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Chef stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">12+</div>
            <div className="text-sm sm:text-base text-muted-foreground">Professional Chefs</div>
          </Card>
          <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">50+</div>
            <div className="text-sm sm:text-base text-muted-foreground">Michelin Stars Combined</div>
          </Card>
          <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <div className="text-3xl sm:text-4xl font-bold text-accent-foreground mb-2">200+</div>
            <div className="text-sm sm:text-base text-muted-foreground">Unique Recipes</div>
          </Card>
        </div>
      </div>
    </section>
  )
}
