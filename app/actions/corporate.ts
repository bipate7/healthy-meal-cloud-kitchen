"use server"

import sql from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const corporateSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  contact_name: z.string().min(2, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  event_date: z.string().optional(),
  guest_count: z.string().optional(),
  message: z.string().optional(),
})

export async function submitCorporateRequest(formData: FormData) {
  try {
    const data = {
      company_name: formData.get("company_name") as string,
      contact_name: formData.get("contact_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      event_date: formData.get("event_date") as string,
      guest_count: formData.get("guest_count") as string,
      message: formData.get("message") as string,
    }

    const validated = corporateSchema.parse(data)

    await sql`
      INSERT INTO corporate_requests (
        company_name,
        contact_name,
        email,
        phone,
        event_date,
        guest_count,
        message,
        status
      )
      VALUES (
        ${validated.company_name},
        ${validated.contact_name},
        ${validated.email},
        ${validated.phone || null},
        ${validated.event_date || null},
        ${validated.guest_count ? Number.parseInt(validated.guest_count) : null},
        ${validated.message || null},
        'pending'
      )
    `

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("[v0] Corporate request error:", error)
    return { error: "Failed to submit corporate request" }
  }
}

export async function getCorporateRequests() {
  try {
    const requests = await sql`
      SELECT * FROM corporate_requests
      ORDER BY created_at DESC
    `

    return { success: true, data: requests }
  } catch (error) {
    return { error: "Failed to get corporate requests" }
  }
}

export async function updateCorporateRequestStatus(requestId: number, status: string) {
  try {
    await sql`
      UPDATE corporate_requests
      SET status = ${status},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${requestId}
    `

    revalidatePath("/admin/corporate")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update status" }
  }
}
