"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getLoyaltyPoints() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const result = await sql`
      SELECT * FROM loyalty_points
      WHERE user_id = ${user.id}
    `

    if (result.length === 0) {
      // Create initial loyalty record
      const newRecord = await sql`
        INSERT INTO loyalty_points (user_id, points, tier)
        VALUES (${user.id}, 0, 'bronze')
        RETURNING *
      `
      return { success: true, data: newRecord[0] }
    }

    return { success: true, data: result[0] }
  } catch (error) {
    return { error: "Failed to get loyalty points" }
  }
}

export async function getLoyaltyTransactions() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const transactions = await sql`
      SELECT * FROM loyalty_transactions
      WHERE user_id = ${user.id}
      ORDER BY created_at DESC
      LIMIT 50
    `

    return { success: true, data: transactions }
  } catch (error) {
    return { error: "Failed to get transactions" }
  }
}

export async function addLoyaltyPoints(orderId: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    // Get order total
    const orderResult = await sql`
      SELECT total_amount FROM orders
      WHERE id = ${orderId} AND user_id = ${user.id}
    `

    if (orderResult.length === 0) {
      return { error: "Order not found" }
    }

    // Calculate points (1 point per dollar)
    const points = Math.floor(Number(orderResult[0].total_amount))

    // Update loyalty points
    await sql`
      INSERT INTO loyalty_points (user_id, points, tier)
      VALUES (${user.id}, ${points}, 'bronze')
      ON CONFLICT (user_id)
      DO UPDATE SET
        points = loyalty_points.points + ${points},
        tier = CASE
          WHEN loyalty_points.points + ${points} >= 500 THEN 'gold'
          WHEN loyalty_points.points + ${points} >= 200 THEN 'silver'
          ELSE 'bronze'
        END,
        updated_at = CURRENT_TIMESTAMP
    `

    // Record transaction
    await sql`
      INSERT INTO loyalty_transactions (user_id, points, type, description, order_id)
      VALUES (${user.id}, ${points}, 'earn', 'Points earned from order #${orderId}', ${orderId})
    `

    revalidatePath("/dashboard")
    return { success: true, points }
  } catch (error) {
    console.error("[v0] Loyalty points error:", error)
    return { error: "Failed to add loyalty points" }
  }
}

export async function redeemLoyaltyPoints(pointsToRedeem: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const loyaltyResult = await sql`
      SELECT points FROM loyalty_points
      WHERE user_id = ${user.id}
    `

    if (loyaltyResult.length === 0 || loyaltyResult[0].points < pointsToRedeem) {
      return { error: "Insufficient points" }
    }

    // Deduct points
    await sql`
      UPDATE loyalty_points
      SET points = points - ${pointsToRedeem},
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${user.id}
    `

    // Record transaction
    await sql`
      INSERT INTO loyalty_transactions (user_id, points, type, description)
      VALUES (${user.id}, ${-pointsToRedeem}, 'redeem', 'Points redeemed for discount')
    `

    revalidatePath("/dashboard")
    return { success: true, discount: pointsToRedeem }
  } catch (error) {
    return { error: "Failed to redeem points" }
  }
}
