import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const orderId = Number.parseInt(params.orderId)

    const [order] = await sql`
      SELECT 
        o.*,
        u.name as user_name,
        u.email as user_email,
        a.full_address,
        a.city,
        a.postal_code
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN addresses a ON o.address_id = a.id
      WHERE o.id = ${orderId}
    `

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Get order items
    const items = await sql`
      SELECT 
        oi.*,
        m.name,
        m.image
      FROM order_items oi
      JOIN meals m ON oi.meal_id = m.id
      WHERE oi.order_id = ${orderId}
    `

    // Get order status history
    const statusHistory = await sql`
      SELECT *
      FROM order_status_history
      WHERE order_id = ${orderId}
      ORDER BY created_at DESC
    `

    return NextResponse.json({
      order,
      items,
      statusHistory,
    })
  } catch (error) {
    console.error("[v0] Error tracking order:", error)
    return NextResponse.json({ error: "Failed to track order" }, { status: 500 })
  }
}
