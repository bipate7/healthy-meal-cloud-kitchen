import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] })
    }

    // Search meals
    const meals = await sql`
      SELECT 
        m.id,
        m.name,
        m.description,
        m.price,
        m.image,
        c.name as category_name,
        'meal' as type
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id
      WHERE m.is_available = true
        AND (m.name ILIKE ${"%" + query + "%"} OR m.description ILIKE ${"%" + query + "%"})
      ORDER BY m.name
      LIMIT 5
    `

    // Search categories
    const categories = await sql`
      SELECT 
        id,
        name,
        slug,
        'category' as type
      FROM categories
      WHERE name ILIKE ${"%" + query + "%"}
      LIMIT 3
    `

    const results = [...meals, ...categories]

    return NextResponse.json({ results, query })
  } catch (error) {
    console.error("[v0] Error searching:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
