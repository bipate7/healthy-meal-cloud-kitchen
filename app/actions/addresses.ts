"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addAddress(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    await sql`
      INSERT INTO addresses (user_id, address_line1, address_line2, city, state, zip_code, is_default)
      VALUES (
        ${user.id},
        ${formData.get("address_line1")},
        ${formData.get("address_line2") || null},
        ${formData.get("city")},
        ${formData.get("state")},
        ${formData.get("zip_code")},
        false
      )
    `

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { error: "Failed to add address" }
  }
}

export async function deleteAddress(addressId: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    await sql`
      DELETE FROM addresses
      WHERE id = ${addressId} AND user_id = ${user.id}
    `

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete address" }
  }
}

export async function setDefaultAddress(addressId: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    // Remove default from all addresses
    await sql`
      UPDATE addresses
      SET is_default = false
      WHERE user_id = ${user.id}
    `

    // Set new default
    await sql`
      UPDATE addresses
      SET is_default = true
      WHERE id = ${addressId} AND user_id = ${user.id}
    `

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { error: "Failed to set default address" }
  }
}
