"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateOrderStatus(orderId: number, status: string) {
  const user = await getCurrentUser()
  if (!user || !user.is_admin) {
    return { error: "Unauthorized" }
  }

  try {
    await sql`
      UPDATE orders
      SET status = ${status},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${orderId}
    `

    revalidatePath("/admin/orders")
    revalidatePath(`/admin/orders/${orderId}`)
    return { success: true }
  } catch (error) {
    return { error: "Failed to update order status" }
  }
}

export async function toggleMealAvailability(mealId: number, isAvailable: boolean) {
  const user = await getCurrentUser()
  if (!user || !user.is_admin) {
    return { error: "Unauthorized" }
  }

  try {
    await sql`
      UPDATE meals
      SET is_available = ${isAvailable},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${mealId}
    `

    revalidatePath("/admin/meals")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update meal availability" }
  }
}
