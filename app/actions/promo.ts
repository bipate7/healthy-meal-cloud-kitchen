"use server"

import sql from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import { z } from "zod"

const promoCodeSchema = z.object({
  code: z.string().min(3).max(50),
})

export async function validatePromoCode(code: string, orderAmount: number) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return { success: false, error: "Please login to use promo codes" }
    }

    const validated = promoCodeSchema.parse({ code: code.toUpperCase() })

    const [promo] = await sql`
      SELECT * FROM promo_codes
      WHERE code = ${validated.code}
        AND is_active = true
        AND valid_from <= NOW()
        AND (valid_until IS NULL OR valid_until >= NOW())
        AND (usage_limit IS NULL OR used_count < usage_limit)
    `

    if (!promo) {
      return { success: false, error: "Invalid or expired promo code" }
    }

    // Check if user already used this code
    const [userUsage] = await sql`
      SELECT * FROM user_promo_usage
      WHERE user_id = ${user.id} AND promo_code_id = ${promo.id}
    `

    if (userUsage) {
      return { success: false, error: "You have already used this promo code" }
    }

    // Check minimum order amount
    if (orderAmount < promo.min_order_amount) {
      return {
        success: false,
        error: `Minimum order amount of ₹${promo.min_order_amount} required`,
      }
    }

    // Calculate discount
    let discountAmount = 0
    if (promo.discount_type === "percentage") {
      discountAmount = (orderAmount * promo.discount_value) / 100
      if (promo.max_discount_amount) {
        discountAmount = Math.min(discountAmount, promo.max_discount_amount)
      }
    } else {
      discountAmount = promo.discount_value
    }

    return {
      success: true,
      promo: {
        id: promo.id,
        code: promo.code,
        description: promo.description,
        discountAmount: Math.round(discountAmount),
      },
    }
  } catch (error) {
    console.error("[v0] Error validating promo code:", error)
    return { success: false, error: "Failed to validate promo code" }
  }
}

export async function applyPromoCode(promoCodeId: number, orderId: number, discountAmount: number) {
  try {
    const user = await verifyAuth()
    if (!user) throw new Error("Unauthorized")

    // Record usage
    await sql`
      INSERT INTO user_promo_usage (user_id, promo_code_id, order_id, discount_amount)
      VALUES (${user.id}, ${promoCodeId}, ${orderId}, ${discountAmount})
    `

    // Increment used count
    await sql`
      UPDATE promo_codes
      SET used_count = used_count + 1
      WHERE id = ${promoCodeId}
    `

    return { success: true }
  } catch (error) {
    console.error("[v0] Error applying promo code:", error)
    return { success: false, error: "Failed to apply promo code" }
  }
}
