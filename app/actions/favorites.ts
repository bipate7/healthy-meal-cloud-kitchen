"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function toggleFavorite(mealId: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const existing = await sql`
      SELECT id FROM favorites
      WHERE user_id = ${user.id} AND meal_id = ${mealId}
    `

    if (existing.length > 0) {
      await sql`
        DELETE FROM favorites
        WHERE user_id = ${user.id} AND meal_id = ${mealId}
      `
    } else {
      await sql`
        INSERT INTO favorites (user_id, meal_id)
        VALUES (${user.id}, ${mealId})
      `
    }

    revalidatePath("/")
    revalidatePath(`/meals/${mealId}`)
    return { success: true }
  } catch (error) {
    return { error: "Failed to update favorites" }
  }
}
