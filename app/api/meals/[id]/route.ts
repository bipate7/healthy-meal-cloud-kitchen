import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const mealId = Number.parseInt(params.id)

    const [meal] = await sql`
      SELECT 
        m.*,
        c.name as category_name,
        c.slug as category_slug,
        COALESCE(AVG(r.rating), 0) as avg_rating,
        COUNT(DISTINCT r.id) as review_count
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN reviews r ON m.id = r.meal_id
      WHERE m.id = ${mealId}
      GROUP BY m.id, c.name, c.slug
    `

    if (!meal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 })
    }

    // Get reviews with user details
    const reviews = await sql`
      SELECT 
        r.*,
        u.name as user_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.meal_id = ${mealId}
      ORDER BY r.created_at DESC
      LIMIT 10
    `

    // Get related meals from same category
    const relatedMeals = await sql`
      SELECT 
        m.*,
        COALESCE(AVG(r.rating), 0) as avg_rating
      FROM meals m
      LEFT JOIN reviews r ON m.id = r.meal_id
      WHERE m.category_id = ${meal.category_id}
        AND m.id != ${mealId}
        AND m.is_available = true
      GROUP BY m.id
      ORDER BY RANDOM()
      LIMIT 4
    `

    return NextResponse.json({
      meal,
      reviews,
      relatedMeals,
    })
  } catch (error) {
    console.error("[v0] Error fetching meal details:", error)
    return NextResponse.json({ error: "Failed to fetch meal details" }, { status: 500 })
  }
}
