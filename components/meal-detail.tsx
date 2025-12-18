"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Star, Plus, Minus, ShoppingCart, Clock, Flame } from "lucide-react"
import { toggleFavorite } from "@/app/actions/favorites"
import { addToCart } from "@/app/actions/cart"

interface Meal {
  id: number
  name: string
  description: string
  category_name: string
  price: number
  image_url: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  ingredients: string[]
  allergens: string[]
  is_vegetarian: boolean
  is_vegan: boolean
  is_gluten_free: boolean
  preparation_time: number
  serving_size: string
  avg_rating: number
  review_count: number
}

interface Review {
  id: number
  user_name: string
  rating: number
  comment: string
  created_at: string
}

interface MealDetailProps {
  meal: Meal
  reviews: Review[]
  isFavorite: boolean
  userId?: number
}

export function MealDetail({ meal, reviews, isFavorite: initialFavorite, userId }: MealDetailProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  async function handleFavorite() {
    if (!userId) {
      router.push("/login")
      return
    }

    setIsFavorite(!isFavorite)
    await toggleFavorite(meal.id)
  }

  async function handleAddToCart() {
    if (!userId) {
      router.push("/login")
      return
    }

    setLoading(true)
    await addToCart(meal.id, quantity)
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-xl">
            <img
              src={meal.image_url || `/placeholder.svg?height=600&width=800&query=${meal.name}`}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleFavorite}
              className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform shadow-lg"
              aria-label="Add to favorites"
            >
              <Heart className={`h-6 w-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-3">{meal.name}</h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{meal.description}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm">
                {meal.category_name}
              </Badge>
              {meal.is_vegetarian && (
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300"
                >
                  🥬 Vegetarian
                </Badge>
              )}
              {meal.is_vegan && (
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300"
                >
                  🌱 Vegan
                </Badge>
              )}
              {meal.is_gluten_free && (
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">
                  Gluten Free
                </Badge>
              )}
            </div>

            {/* Rating */}
            {meal.review_count > 0 && (
              <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= meal.avg_rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="font-semibold">
                  {Number(meal.avg_rating).toFixed(1)} ({meal.review_count} reviews)
                </span>
              </div>
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{meal.preparation_time} mins prep</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-muted-foreground">{meal.calories} calories</span>
              </div>
            </div>

            {/* Nutrition Card */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-lg">Nutrition Facts</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Protein</div>
                    <div className="text-2xl font-bold text-primary">{meal.protein}g</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Carbs</div>
                    <div className="text-2xl font-bold text-orange-500">{meal.carbs}g</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Fat</div>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">{meal.fat}g</div>
                  </div>
                  {meal.fiber && (
                    <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Fiber</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500">{meal.fiber}g</div>
                    </div>
                  )}
                  <div className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg col-span-2 sm:col-span-1">
                    <div className="text-sm text-muted-foreground mb-1">Serving</div>
                    <div className="text-lg font-semibold">{meal.serving_size}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price and Add to Cart */}
            <Card className="shadow-xl border-2 border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Price</div>
                    <div className="text-4xl font-bold text-primary">₹{Number(meal.price).toFixed(0)}</div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="w-full gap-2 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 shadow-lg h-12 text-base font-semibold"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart - ₹{(Number(meal.price) * quantity).toFixed(0)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {meal.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Allergen Information */}
        {meal.allergens && meal.allergens.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Allergen Information</h2>
            <div className="flex flex-wrap gap-2">
              {meal.allergens.map((allergen, index) => (
                <Badge key={index} variant="destructive">
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        {reviews.length > 0 && (
          <>
            <Separator className="my-12" />
            <div>
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold">{review.user_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${star <= review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
