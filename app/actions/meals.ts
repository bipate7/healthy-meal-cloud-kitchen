"use server";

import sql from "@/lib/db";
import { getCached, setCache } from "@/lib/cache";

export async function getMeals(filters?: {
  category?: string;
  search?: string;
  dietary?: string[];
  sort?: string;
}) {
  try {
    const cacheKey = `meals:${JSON.stringify(filters)}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    let query = `
      SELECT 
        m.*,
        c.name as category_name,
        COALESCE(AVG(r.rating), 0) as avg_rating,
        COUNT(DISTINCT r.id) as review_count
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN reviews r ON m.id = r.meal_id
      WHERE m.is_available = true
    `;

    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.category) {
      query += ` AND c.name = $${paramIndex}`;
      params.push(filters.category);
      paramIndex++;
    }

    if (filters?.search) {
      query += ` AND (m.name ILIKE $${paramIndex} OR m.description ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    if (filters?.dietary) {
      for (const diet of filters.dietary) {
        if (diet === "vegetarian") query += ` AND m.is_vegetarian = true`;
        if (diet === "vegan") query += ` AND m.is_vegan = true`;
        if (diet === "gluten-free") query += ` AND m.is_gluten_free = true`;
      }
    }

    query += ` GROUP BY m.id, c.name`;

    // Sorting
    const sort = filters?.sort || "popular";
    if (sort === "price_low") {
      query += ` ORDER BY m.price ASC`;
    } else if (sort === "price_high") {
      query += ` ORDER BY m.price DESC`;
    } else if (sort === "rating") {
      query += ` ORDER BY avg_rating DESC`;
    } else {
      query += ` ORDER BY review_count DESC`;
    }

    // @ts-ignore - neon sql function has a query property for non-tagged usage
    const meals = await sql.query(query, params)

    setCache(cacheKey, meals, 300) // Cache for 5 minutes
    return meals;
  } catch (error) {
    console.error("[v0] Error fetching meals:", error);
    throw new Error("Failed to fetch meals");
  }
}

export async function getMealById(id: number) {
  try {
    const cacheKey = `meal:${id}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const [meal] = await sql`
      SELECT 
        m.*,
        c.name as category_name,
        COALESCE(AVG(r.rating), 0) as avg_rating,
        COUNT(DISTINCT r.id) as review_count
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN reviews r ON m.id = r.meal_id
      WHERE m.id = ${id}
      GROUP BY m.id, c.name
    `;

    if (!meal) return null;

    setCache(cacheKey, meal, 300);
    return meal;
  } catch (error) {
    console.error("[v0] Error fetching meal:", error);
    throw new Error("Failed to fetch meal");
  }
}

export async function getCategories() {
  try {
    const cacheKey = "categories";
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const categories = await sql`
      SELECT 
        c.*,
        COUNT(DISTINCT m.id) as meal_count
      FROM categories c
      LEFT JOIN meals m ON c.id = m.category_id AND m.is_available = true
      GROUP BY c.id
      ORDER BY c.display_order ASC
    `;

    setCache(cacheKey, categories, 600); // Cache for 10 minutes
    return categories;
  } catch (error) {
    console.error("[v0] Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
