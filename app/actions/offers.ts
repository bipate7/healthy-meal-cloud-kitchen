"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getActiveLimitedOffers() {
  try {
    const offers = await sql`
      SELECT lo.*, m.name as meal_name, m.image_url, m.price
      FROM limited_offers lo
      JOIN meals m ON lo.meal_id = m.id
      WHERE lo.is_active = true
      AND lo.end_date > CURRENT_TIMESTAMP
      ORDER BY lo.end_date ASC
    `

    return { success: true, data: offers }
  } catch (error) {
    return { error: "Failed to get limited offers" }
  }
}

export async function createLimitedOffer(formData: FormData) {
  const user = await getCurrentUser()
  if (!user || !user.is_admin) {
    return { error: "Unauthorized" }
  }

  try {
    await sql`
      INSERT INTO limited_offers (
        title,
        description,
        discount_percentage,
        meal_id,
        start_date,
        end_date,
        is_active
      )
      VALUES (
        ${formData.get("title")},
        ${formData.get("description")},
        ${formData.get("discount_percentage")},
        ${formData.get("meal_id")},
        ${formData.get("start_date")},
        ${formData.get("end_date")},
        true
      )
    `

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("[v0] Create offer error:", error)
    return { error: "Failed to create limited offer" }
  }
}

export async function toggleOfferStatus(offerId: number, isActive: boolean) {
  const user = await getCurrentUser()
  if (!user || !user.is_admin) {
    return { error: "Unauthorized" }
  }

  try {
    await sql`
      UPDATE limited_offers
      SET is_active = ${isActive}
      WHERE id = ${offerId}
    `

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update offer status" }
  }
}
