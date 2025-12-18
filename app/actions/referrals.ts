"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const referralSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function createReferral(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const data = {
      email: formData.get("email") as string,
    }

    const validated = referralSchema.parse(data)

    // Check if already referred
    const existing = await sql`
      SELECT id FROM referrals
      WHERE referrer_user_id = ${user.id} AND referred_email = ${validated.email}
    `

    if (existing.length > 0) {
      return { error: "Email already referred" }
    }

    // Create referral
    await sql`
      INSERT INTO referrals (referrer_user_id, referred_email, status)
      VALUES (${user.id}, ${validated.email}, 'pending')
    `

    revalidatePath("/dashboard")
    return { success: true, message: "Referral sent successfully!" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: "Failed to create referral" }
  }
}

export async function getReferrals() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const referrals = await sql`
      SELECT * FROM referrals
      WHERE referrer_user_id = ${user.id}
      ORDER BY created_at DESC
    `

    return { success: true, data: referrals }
  } catch (error) {
    return { error: "Failed to get referrals" }
  }
}

export async function completeReferral(referralId: number, referredUserId: number) {
  try {
    // Update referral status
    await sql`
      UPDATE referrals
      SET status = 'completed',
          referred_user_id = ${referredUserId},
          completed_at = CURRENT_TIMESTAMP
      WHERE id = ${referralId}
    `

    // Get referrer user id
    const referralResult = await sql`
      SELECT referrer_user_id FROM referrals WHERE id = ${referralId}
    `

    if (referralResult.length > 0) {
      const referrerId = referralResult[0].referrer_user_id

      // Award loyalty points to referrer (50 points)
      await sql`
        INSERT INTO loyalty_points (user_id, points, tier)
        VALUES (${referrerId}, 50, 'bronze')
        ON CONFLICT (user_id)
        DO UPDATE SET
          points = loyalty_points.points + 50,
          updated_at = CURRENT_TIMESTAMP
      `

      // Record transaction
      await sql`
        INSERT INTO loyalty_transactions (user_id, points, type, description)
        VALUES (${referrerId}, 50, 'earn', 'Referral bonus')
      `
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Referral completion error:", error)
    return { error: "Failed to complete referral" }
  }
}
