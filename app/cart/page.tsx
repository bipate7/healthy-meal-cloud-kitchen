import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { Header } from "@/components/header"
import { CartContent } from "@/components/cart-content"
import { getCart } from "@/app/actions/cart"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export default async function CartPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const cart = await getCart()

  const cartCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} cartCount={cartCount} />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Add some delicious, healthy meals to get started on your wellness journey!
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-orange-500" asChild>
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const mealIds = cart.map((item: { mealId: number }) => item.mealId)
  const meals = await sql`
    SELECT * FROM meals WHERE id = ANY(${mealIds})
  `

  const cartItems = cart.map((item: { mealId: number; quantity: number }) => {
    const meal = meals.find((m) => m.id === item.mealId)
    return { ...meal, quantity: item.quantity }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} cartCount={cartCount} />
      <div className="pt-24">
        <CartContent items={cartItems} />
      </div>
    </div>
  )
}
