import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { Header } from "@/components/header"
import { MealDetail } from "@/components/meal-detail"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MealPage({ params }: PageProps) {
  const { id } = await params
  const user = await getCurrentUser()

  const mealResult = await sql`
    SELECT m.*, c.name as category_name,
           COALESCE(AVG(r.rating), 0) as avg_rating,
           COUNT(r.id) as review_count
    FROM meals m
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN reviews r ON m.id = r.meal_id
    WHERE m.id = ${id}
    GROUP BY m.id, c.name
  `

  if (mealResult.length === 0) {
    notFound()
  }

  const meal = mealResult[0]

  const reviews = await sql`
    SELECT r.*, u.name as user_name
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.meal_id = ${id}
    ORDER BY r.created_at DESC
    LIMIT 10
  `

  let isFavorite = false
  if (user) {
    const favoriteCheck = await sql`
      SELECT id FROM favorites
      WHERE user_id = ${user.id} AND meal_id = ${id}
    `
    isFavorite = favoriteCheck.length > 0
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <MealDetail meal={meal} reviews={reviews} isFavorite={isFavorite} userId={user?.id} />
    </div>
  )
}
