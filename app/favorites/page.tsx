import { Header } from "@/components/header"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default async function FavoritesPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const favorites = await sql`
    SELECT m.*, f.created_at as favorited_at
    FROM favorites f
    JOIN meals m ON f.meal_id = m.id
    WHERE f.user_id = ${user.id}
    ORDER BY f.created_at DESC
  `

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl md:text-4xl font-bold">Your Favorites</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="h-5 w-5 fill-primary text-primary" />
                <span>{favorites.length} meals</span>
              </div>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
                <p className="text-muted-foreground mb-6">Start adding meals you love to your favorites!</p>
                <Button asChild className="bg-gradient-to-r from-primary to-orange-500">
                  <Link href="/menu">Browse Menu</Link>
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((meal: any) => (
                  <div
                    key={meal.id}
                    className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48">
                      <img
                        src={meal.image_url || `/placeholder.svg?height=300&width=400&query=${meal.name}`}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Heart className="h-4 w-4 fill-primary text-primary" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{meal.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary">₹{meal.price}</div>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-orange-500">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
