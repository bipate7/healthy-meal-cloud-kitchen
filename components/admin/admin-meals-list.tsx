"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Pencil } from "lucide-react"
import { toggleMealAvailability } from "@/app/actions/admin"
import Link from "next/link"

interface Meal {
  id: number
  name: string
  description: string
  category_name: string
  price: number
  image_url: string
  calories: number
  is_available: boolean
  avg_rating: number
  review_count: number
  order_count: number
}

interface Category {
  id: number
  name: string
}

interface AdminMealsListProps {
  meals: Meal[]
  categories: Category[]
}

export function AdminMealsList({ meals }: AdminMealsListProps) {
  const router = useRouter()

  async function handleToggleAvailability(mealId: number, isAvailable: boolean) {
    await toggleMealAvailability(mealId, !isAvailable)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <Card key={meal.id}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                <img
                  src={meal.image_url || "/placeholder.svg"}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{meal.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{meal.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{meal.category_name}</Badge>
                      <Badge variant="outline">{meal.calories} cal</Badge>
                      {meal.review_count > 0 && (
                        <Badge variant="outline">
                          ⭐ {Number(meal.avg_rating).toFixed(1)} ({meal.review_count})
                        </Badge>
                      )}
                      <Badge variant="outline">{meal.order_count} orders</Badge>
                    </div>
                  </div>
                  <div className="text-right space-y-3">
                    <div className="text-xl font-bold">${Number(meal.price).toFixed(2)}</div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={meal.is_available}
                        onCheckedChange={() => handleToggleAvailability(meal.id, meal.is_available)}
                      />
                      <span className="text-sm">{meal.is_available ? "Available" : "Unavailable"}</span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/meals/${meal.id}/edit`}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
