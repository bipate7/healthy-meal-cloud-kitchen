"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Plus } from "lucide-react"
import { toggleFavorite } from "@/app/actions/favorites"
import { addToCart } from "@/app/actions/cart"
import { useRouter } from "next/navigation"

interface Meal {
  id: number
  name: string
  description: string
  category_name: string
  price: number
  image_url: string
  calories: number
  protein: number
  is_vegetarian: boolean
  is_vegan: boolean
  is_gluten_free: boolean
  avg_rating: number
  review_count: number
}

interface MealCardProps {
  meal: Meal
  isFavorite: boolean
  userId?: number
}

export function MealCard({ meal, isFavorite: initialFavorite, userId }: MealCardProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
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
    setLoading(true)
    await addToCart(meal.id, 1)
    setLoading(false)
    router.refresh()
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <Link href={`/meals/${meal.id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={meal.image_url || "/placeholder.svg"}
            alt={meal.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/meals/${meal.id}`} className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight truncate hover:text-primary transition-colors">
              {meal.name}
            </h3>
          </Link>
          <button
            onClick={handleFavorite}
            className="shrink-0 p-1 hover:scale-110 transition-transform"
            aria-label="Add to favorites"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{meal.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="secondary" className="text-xs">
            {meal.category_name}
          </Badge>
          {meal.is_vegetarian && (
            <Badge variant="outline" className="text-xs">
              Vegetarian
            </Badge>
          )}
          {meal.is_vegan && (
            <Badge variant="outline" className="text-xs">
              Vegan
            </Badge>
          )}
          {meal.is_gluten_free && (
            <Badge variant="outline" className="text-xs">
              Gluten Free
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{meal.calories} cal</span>
          <span>{meal.protein}g protein</span>
          {meal.review_count > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="text-foreground font-medium">{Number(meal.avg_rating).toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
        <div className="text-2xl font-bold">${Number(meal.price).toFixed(2)}</div>
        <Button onClick={handleAddToCart} disabled={loading} className="gap-2">
          <Plus className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
