"use server"

import { getCurrentUser } from "@/lib/auth"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

interface CartItem {
  mealId: number
  quantity: number
}

export async function addToCart(mealId: number, quantity: number) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    const cookieStore = await cookies()
    const cartData = cookieStore.get("cart")?.value
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : []

    const existingItem = cart.find((item) => item.mealId === mealId)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ mealId, quantity })
    }

    cookieStore.set("cart", JSON.stringify(cart), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    return { error: "Failed to add to cart" }
  }
}

export async function getCart() {
  const cookieStore = await cookies()
  const cartData = cookieStore.get("cart")?.value
  return cartData ? JSON.parse(cartData) : []
}

export async function updateCartItem(mealId: number, quantity: number) {
  const cookieStore = await cookies()
  const cartData = cookieStore.get("cart")?.value
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : []

  const item = cart.find((item) => item.mealId === mealId)
  if (item) {
    if (quantity <= 0) {
      const filtered = cart.filter((item) => item.mealId !== mealId)
      cookieStore.set("cart", JSON.stringify(filtered), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      })
    } else {
      item.quantity = quantity
      cookieStore.set("cart", JSON.stringify(cart), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      })
    }
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function clearCart() {
  const cookieStore = await cookies()
  cookieStore.delete("cart")
  revalidatePath("/cart")
  return { success: true }
}
