import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const dietary = searchParams.get("dietary")
    const sort = searchParams.get("sort") || "popular"
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = `
      SELECT 
        m.*,
        c.name as category_name,
        COALESCE(AVG(r.rating), 0) as avg_rating,
        COUNT(DISTINCT r.id) as review_count,
        COUNT(DISTINCT oi.id) as order_count
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN reviews r ON m.id = r.meal_id
      LEFT JOIN order_items oi ON m.id = oi.meal_id
      WHERE m.is_available = true
    `

    const params: any[] = []
    let paramIndex = 1

    if (category) {
      query += ` AND c.slug = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (search) {
      query += ` AND (m.name ILIKE $${paramIndex} OR m.description ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (dietary) {
      const dietaryFilters = dietary.split(",")
      for (const filter of dietaryFilters) {
        if (filter === "vegetarian") {
          query += ` AND m.is_vegetarian = true`
        } else if (filter === "vegan") {
          query += ` AND m.is_vegan = true`
        } else if (filter === "gluten-free") {
          query += ` AND m.is_gluten_free = true`
        }
      }
    }

    query += ` GROUP BY m.id, c.name`

    // Sorting
    if (sort === "price_low") {
      query += ` ORDER BY m.price ASC`
    } else if (sort === "price_high") {
      query += ` ORDER BY m.price DESC`
    } else if (sort === "rating") {
      query += ` ORDER BY avg_rating DESC`
    } else {
      query += ` ORDER BY order_count DESC, avg_rating DESC`
    }

    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(limit, offset)

    const meals = await sql(query, params)

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as total FROM meals m WHERE m.is_available = true`
    const countParams: any[] = []
    let countParamIndex = 1

    if (category) {
      countQuery += ` AND m.category_id IN (SELECT id FROM categories WHERE slug = $${countParamIndex})`
      countParams.push(category)
      countParamIndex++
    }

    if (search) {
      countQuery += ` AND (m.name ILIKE $${countParamIndex} OR m.description ILIKE $${countParamIndex})`
      countParams.push(`%${search}%`)
    }

    const [{ total }] = await sql(countQuery, countParams)

    return NextResponse.json({
      meals,
      pagination: {
        total: Number.parseInt(total),
        limit,
        offset,
        hasMore: offset + limit < Number.parseInt(total),
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching meals:", error)
    return NextResponse.json({ error: "Failed to fetch meals" }, { status: 500 })
  }
}
