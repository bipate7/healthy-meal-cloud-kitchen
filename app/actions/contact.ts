"use server"

import { z } from "zod"
import sql from "@/lib/db"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || null,
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    const validated = contactSchema.parse(data)

    // Insert contact message into database
    await sql`
      INSERT INTO contact_messages (name, email, phone, subject, message, status, created_at)
      VALUES (
        ${validated.name},
        ${validated.email},
        ${validated.phone},
        ${validated.subject},
        ${validated.message},
        'pending',
        NOW()
      )
    `

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

    return { success: true }
  } catch (error) {
    console.error("[v0] Contact form submission error:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Failed to submit contact form" }
  }
}
