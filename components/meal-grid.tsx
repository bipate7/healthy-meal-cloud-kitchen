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

interface MealGridProps {
  meals: Meal[]
  favorites: number[]
  userId?: number
}

export function MealGrid({ meals, favorites, userId }: MealGridProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} isFavorite={favorites.includes(meal.id)} userId={userId} />
        ))}
      </div>
    </div>
  )
}
