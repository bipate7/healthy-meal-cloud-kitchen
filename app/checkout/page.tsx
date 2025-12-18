import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { Header } from "@/components/header"
import { CheckoutForm } from "@/components/checkout-form"
import { getCart } from "@/app/actions/cart"

export default async function CheckoutPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const cart = await getCart()
  if (cart.length === 0) {
    redirect("/cart")
  }

  const mealIds = cart.map((item: { mealId: number }) => item.mealId)
  const meals = await sql`
    SELECT * FROM meals WHERE id = ANY(${mealIds})
  `

  const cartItems = cart.map((item: { mealId: number; quantity: number }) => {
    const meal = meals.find((m) => m.id === item.mealId)
    return { ...meal, quantity: item.quantity }
  })

  const addresses = await sql`
    SELECT * FROM addresses WHERE user_id = ${user.id} ORDER BY is_default DESC, created_at DESC
  `

  const subtotal = cartItems.reduce((sum: number, item: any) => sum + Number(item.price) * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <CheckoutForm items={cartItems} addresses={addresses} total={total} />
    </div>
  )
}
