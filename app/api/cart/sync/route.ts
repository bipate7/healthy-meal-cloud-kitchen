import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items } = await request.json()

    // Clear existing cart
    await sql`DELETE FROM cart_items WHERE user_id = ${user.id}`

    // Insert new items
    if (items && items.length > 0) {
      for (const item of items) {
        await sql`
          INSERT INTO cart_items (user_id, meal_id, quantity)
          VALUES (${user.id}, ${item.mealId}, ${item.quantity})
        `
      }
    }

    // Return updated cart
    const cartItems = await sql`
      SELECT 
        ci.*,
        m.name,
        m.price,
        m.image,
        m.is_available
      FROM cart_items ci
      JOIN meals m ON ci.meal_id = m.id
      WHERE ci.user_id = ${user.id}
    `

    return NextResponse.json({ success: true, items: cartItems })
  } catch (error) {
    console.error("[v0] Error syncing cart:", error)
    return NextResponse.json({ error: "Failed to sync cart" }, { status: 500 })
  }
}
