"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Category {
  id: number
  name: string
  description: string
}

interface MealCategoriesProps {
  categories: Category[]
}

export function MealCategories({ categories }: MealCategoriesProps) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="mb-12" id="meals">
      <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        <Button
          variant={selected === null ? "default" : "outline"}
          onClick={() => setSelected(null)}
          className="rounded-full"
        >
          All Meals
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selected === category.id ? "default" : "outline"}
            onClick={() => setSelected(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
