import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { Header } from "@/components/header"
import { AdminMealsList } from "@/components/admin/admin-meals-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function AdminMealsPage() {
  const user = await getCurrentUser()
  if (!user || !user.is_admin) {
    redirect("/")
  }

  const meals = await sql`
    SELECT m.*, c.name as category_name,
           COALESCE(AVG(r.rating), 0) as avg_rating,
           COUNT(DISTINCT r.id) as review_count,
           COUNT(DISTINCT oi.id) as order_count
    FROM meals m
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN reviews r ON m.id = r.meal_id
    LEFT JOIN order_items oi ON m.id = oi.meal_id
    GROUP BY m.id, c.name
    ORDER BY m.created_at DESC
  `

  const categories = await sql`
    SELECT * FROM categories ORDER BY name
  `

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Manage Meals</h1>
          <Button asChild>
            <Link href="/admin/meals/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Link>
          </Button>
        </div>
        <AdminMealsList meals={meals} categories={categories} />
      </div>
    </div>
  )
}
