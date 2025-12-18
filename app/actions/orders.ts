"use server"

import { getCurrentUser } from "@/lib/auth"
import sql from "@/lib/db"
import { getCart, clearCart } from "./cart"
import { redirect } from "next/navigation"

export async function placeOrder(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const cart = await getCart()
    if (cart.length === 0) {
      return { error: "Cart is empty" }
    }

    const mealIds = cart.map((item: { mealId: number }) => item.mealId)
    const meals = await sql`
      SELECT * FROM meals WHERE id = ANY(${mealIds})
    `

    const totalAmount = cart.reduce((sum: number, item: { mealId: number; quantity: number }) => {
      const meal = meals.find((m) => m.id === item.mealId)
      return sum + Number(meal.price) * item.quantity
    }, 0)

    const totalWithTax = totalAmount * 1.08

    // Handle address
    let addressId = formData.get("address_id")
    if (!addressId) {
      const addressResult = await sql`
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
        RETURNING id
      `
      addressId = addressResult[0].id
    }

    // Create order
    const orderResult = await sql`
      INSERT INTO orders (
        user_id,
        address_id,
        total_amount,
        status,
        payment_status,
        delivery_date,
        delivery_time,
        special_instructions
      )
      VALUES (
        ${user.id},
        ${addressId},
        ${totalWithTax},
        'pending',
        'pending',
        ${formData.get("delivery_date")},
        ${formData.get("delivery_time")},
        ${formData.get("special_instructions") || null}
      )
      RETURNING id
    `

    const orderId = orderResult[0].id

    // Create order items
    for (const item of cart) {
      const meal = meals.find((m: any) => m.id === item.mealId)
      await sql`
        INSERT INTO order_items (order_id, meal_id, quantity, price)
        VALUES (${orderId}, ${item.mealId}, ${item.quantity}, ${meal.price})
      `
    }

    await clearCart()

    return { success: true, orderId }
  } catch (error) {
    console.error("[v0] Order placement error:", error)
    return { error: "Failed to place order" }
  }
}

export async function getOrder(orderId: number) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const orderResult = await sql`
    SELECT o.*, a.address_line1, a.address_line2, a.city, a.state, a.zip_code
    FROM orders o
    LEFT JOIN addresses a ON o.address_id = a.id
    WHERE o.id = ${orderId} AND o.user_id = ${user.id}
  `

  if (orderResult.length === 0) {
    return null
  }

  const order = orderResult[0]

  const items = await sql`
    SELECT oi.*, m.name, m.image_url
    FROM order_items oi
    JOIN meals m ON oi.meal_id = m.id
    WHERE oi.order_id = ${orderId}
  `

  return { ...order, items }
}
