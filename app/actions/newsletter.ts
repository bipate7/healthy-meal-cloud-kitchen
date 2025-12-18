"use server"

import sql from "@/lib/db"
import { z } from "zod"

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
    }

    const validated = emailSchema.parse(data)

    // Check if already subscribed
    const existing = await sql`
      SELECT id, is_active FROM newsletter_subscriptions
      WHERE email = ${validated.email}
    `

    if (existing.length > 0) {
      if (existing[0].is_active) {
        return { error: "Email already subscribed" }
      } else {
        // Reactivate subscription
        await sql`
          UPDATE newsletter_subscriptions
          SET is_active = true,
              unsubscribed_at = NULL
          WHERE email = ${validated.email}
        `
        return { success: true, message: "Subscription reactivated!" }
      }
    }

    // New subscription
    await sql`
      INSERT INTO newsletter_subscriptions (email, is_active)
      VALUES (${validated.email}, true)
    `

    return { success: true, message: "Successfully subscribed!" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("[v0] Newsletter error:", error)
    return { error: "Failed to subscribe" }
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    await sql`
      UPDATE newsletter_subscriptions
      SET is_active = false,
          unsubscribed_at = CURRENT_TIMESTAMP
      WHERE email = ${email}
    `

    return { success: true, message: "Successfully unsubscribed" }
  } catch (error) {
    return { error: "Failed to unsubscribe" }
  }
}
