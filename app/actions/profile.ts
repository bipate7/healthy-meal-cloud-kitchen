"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { z } from "zod"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
})

export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    }

    const validated = profileSchema.parse(data)

    // Check if email is taken by another user
    const existing = await sql`
      SELECT id FROM users WHERE email = ${validated.email} AND id != ${user.id}
    `

    if (existing.length > 0) {
      return { error: "Email already in use" }
    }

    await sql`
      UPDATE users
      SET name = ${validated.name},
          email = ${validated.email},
          phone = ${validated.phone || null},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${user.id}
    `

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: "Failed to update profile" }
  }
}
