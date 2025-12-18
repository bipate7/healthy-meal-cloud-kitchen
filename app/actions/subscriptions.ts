"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function subscribeToPlansAction(planId: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user already has an active subscription
    const existing = await sql`
      SELECT id FROM subscriptions
      WHERE user_id = ${user.id} AND status = 'active'
    `

    if (existing.length > 0) {
      return { error: "You already have an active subscription" }
    }

    // Get plan details
    const planResult = await sql`
      SELECT * FROM subscription_plans WHERE id = ${planId}
    `

    if (planResult.length === 0) {
      return { error: "Plan not found" }
    }

    const startDate = new Date()
    const nextBillingDate = new Date()
    nextBillingDate.setDate(nextBillingDate.getDate() + 7)

    // Create subscription
    await sql`
      INSERT INTO subscriptions (user_id, plan_id, status, start_date, next_billing_date)
      VALUES (${user.id}, ${planId}, 'active', ${startDate.toISOString()}, ${nextBillingDate.toISOString()})
    `

    revalidatePath("/subscriptions")
    return { success: true }
  } catch (error) {
    console.error("[v0] Subscription error:", error)
    return { error: "Failed to create subscription" }
  }
}

export async function cancelSubscription(subscriptionId: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    await sql`
      UPDATE subscriptions
      SET status = 'cancelled',
          end_date = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${subscriptionId} AND user_id = ${user.id}
    `

    revalidatePath("/subscriptions")
    return { success: true }
  } catch (error) {
    return { error: "Failed to cancel subscription" }
  }
}
