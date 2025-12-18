"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
})

export async function addReview(mealId: number, formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const data = {
      rating: Number.parseInt(formData.get("rating") as string),
      comment: formData.get("comment") as string,
    }

    const validated = reviewSchema.parse(data)

    // Check if user has already reviewed this meal
    const existing = await sql`
      SELECT id FROM reviews
      WHERE user_id = ${user.id} AND meal_id = ${mealId}
    `

    if (existing.length > 0) {
      // Update existing review
      await sql`
        UPDATE reviews
        SET rating = ${validated.rating},
            comment = ${validated.comment},
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${user.id} AND meal_id = ${mealId}
      `
    } else {
      // Create new review
      await sql`
        INSERT INTO reviews (user_id, meal_id, rating, comment)
        VALUES (${user.id}, ${mealId}, ${validated.rating}, ${validated.comment})
      `
    }

    revalidatePath(`/meals/${mealId}`)
    revalidatePath("/menu")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("[v0] Review error:", error)
    return { error: "Failed to add review" }
  }
}

export async function getReviews(mealId: number) {
  try {
    const reviews = await sql`
      SELECT r.*, u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.meal_id = ${mealId}
      ORDER BY r.created_at DESC
    `

    return { success: true, data: reviews }
  } catch (error) {
    return { error: "Failed to get reviews" }
  }
}

export async function deleteReview(reviewId: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    await sql`
      DELETE FROM reviews
      WHERE id = ${reviewId} AND user_id = ${user.id}
    `

    revalidatePath("/menu")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete review" }
  }
}
