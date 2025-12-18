import { NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET() {
  try {
    const categories = await sql`
      SELECT 
        c.*,
        COUNT(DISTINCT m.id) as meal_count
      FROM categories c
      LEFT JOIN meals m ON c.id = m.category_id AND m.is_available = true
      GROUP BY c.id
      ORDER BY c.display_order ASC
    `

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
