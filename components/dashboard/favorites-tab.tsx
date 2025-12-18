"use client"

import { MealCard } from "@/components/meal-card"

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
  is_vegetarian: boolean
  is_vegan: boolean
  is_gluten_free: boolean
  avg_rating: number
  review_count: number
}

interface FavoritesTabProps {
  meals: Meal[]
}

export function FavoritesTab({ meals }: FavoritesTabProps) {
  if (meals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No favorite meals yet. Start browsing and add your favorites!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} isFavorite={true} userId={1} />
      ))}
    </div>
  )
}
