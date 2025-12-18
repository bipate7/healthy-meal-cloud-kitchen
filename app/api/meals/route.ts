import { type NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Await the async params

  try {
    // Fetch the meal with category name
    const mealResult = await sql`
      SELECT 
        m.*,
        c.name as category_name
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id
      WHERE m.id = ${id} AND m.is_available = true
    `;

    if (mealResult.length === 0) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }

    const meal = mealResult[0];

    // Fetch reviews for this meal
    const reviews = await sql`
      SELECT 
        r.id,
        r.rating,
        r.comment,
        r.created_at,
        u.name as user_name,
        u.email as user_email
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.meal_id = ${id}
      ORDER BY r.created_at DESC
    `;

    // Fetch related meals (same category, excluding current meal)
    const relatedMeals = await sql`
      SELECT 
        m.id,
        m.name,
        m.price,
        m.image_url,
        m.description,
        COALESCE(AVG(r.rating), 0) as avg_rating,
        COUNT(DISTINCT r.id) as review_count
      FROM meals m
      LEFT JOIN reviews r ON m.id = r.meal_id
      WHERE m.category_id = ${meal.category_id}
        AND m.id != ${id}
        AND m.is_available = true
      GROUP BY m.id
      ORDER BY avg_rating DESC, review_count DESC
      LIMIT 6
    `;

    return NextResponse.json({
      meal,
      reviews,
      relatedMeals,
    });
  } catch (error) {
    console.error("[API] Error fetching meal by id:", error);
    return NextResponse.json(
      { error: "Failed to fetch meal" },
      { status: 500 }
    );
  }
}
