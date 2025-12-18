"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function saveQuizResults(formData: FormData) {
  const user = await getCurrentUser()

  try {
    const goal = formData.get("goal") as string
    const dietaryPreference = formData.get("dietary_preference") as string
    const activityLevel = formData.get("activity_level") as string
    const allergies = formData.getAll("allergies") as string[]

    // Get recommended meals based on preferences
    let query = sql`SELECT id FROM meals WHERE is_available = true`

    if (dietaryPreference === "vegetarian") {
      query = sql`SELECT id FROM meals WHERE is_available = true AND is_vegetarian = true`
    } else if (dietaryPreference === "vegan") {
      query = sql`SELECT id FROM meals WHERE is_available = true AND is_vegan = true`
    } else if (dietaryPreference === "gluten-free") {
      query = sql`SELECT id FROM meals WHERE is_available = true AND is_gluten_free = true`
    }

    const meals = await query
    const recommendedMealIds = meals.slice(0, 6).map((m: any) => m.id)

    // Save quiz results
    const result = await sql`
      INSERT INTO quiz_results (
        user_id,
        goal,
        dietary_preference,
        activity_level,
        allergies,
        recommended_meals
      )
      VALUES (
        ${user?.id || null},
        ${goal},
        ${dietaryPreference},
        ${activityLevel},
        ${allergies},
        ${recommendedMealIds}
      )
      RETURNING id
    `

    revalidatePath("/")
    return { success: true, quizId: result[0].id, recommendedMealIds }
  } catch (error) {
    console.error("[v0] Quiz error:", error)
    return { error: "Failed to save quiz results" }
  }
}

export async function getQuizResults(quizId: number) {
  try {
    const result = await sql`
      SELECT * FROM quiz_results
      WHERE id = ${quizId}
    `

    if (result.length === 0) {
      return { error: "Quiz results not found" }
    }

    // Get recommended meals
    const mealIds = result[0].recommended_meals
    const meals = await sql`
      SELECT * FROM meals
      WHERE id = ANY(${mealIds})
    `

    return { success: true, data: result[0], meals }
  } catch (error) {
    return { error: "Failed to get quiz results" }
  }
}
