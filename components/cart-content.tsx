"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { updateCartItem } from "@/app/actions/cart"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  quantity: number
}

interface CartContentProps {
  items: CartItem[]
}

export function CartContent({ items }: CartContentProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<number | null>(null)

  async function handleUpdateQuantity(mealId: number, quantity: number) {
    setLoading(mealId)
    await updateCartItem(mealId, quantity)
    setLoading(null)
    router.refresh()
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
  const gst = subtotal * 0.05
  const deliveryCharge = subtotal >= 500 ? 0 : 40
  const total = subtotal + gst + deliveryCharge

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link href={`/meals/${item.id}`} className="shrink-0">
                      <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted hover:opacity-80 transition-opacity">
                        <img
                          src={item.image_url || `/placeholder.svg?height=200&width=200&query=${item.name}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/meals/${item.id}`}>
                        <h3 className="font-semibold text-base sm:text-lg mb-1 hover:text-primary transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>

                      {/* Price and Controls */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-xl sm:text-2xl font-bold text-primary">
                          ₹{Number(item.price).toFixed(0)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9 bg-transparent"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={loading === item.id}
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="w-8 sm:w-12 text-center font-semibold text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9 bg-transparent"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={loading === item.id}
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9 text-destructive hover:text-destructive"
                            onClick={() => handleUpdateQuantity(item.id, 0)}
                            disabled={loading === item.id}
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-2 text-sm text-muted-foreground">
                        Item Total: ₹{(Number(item.price) * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Continue Shopping */}
            <Button variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <Link href="/menu">Continue Shopping</Link>
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-primary to-orange-500 rounded-full" />
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                    <span className="font-medium">₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span className="font-medium">₹{gst.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-muted-foreground">Delivery Charges</span>
                    <span className="font-medium">
                      {deliveryCharge === 0 ? (
                        <span className="text-green-600 font-semibold">FREE</span>
                      ) : (
                        `₹${deliveryCharge}`
                      )}
                    </span>
                  </div>

                  {subtotal < 500 && (
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                      <p className="text-xs text-amber-800 dark:text-amber-200">
                        Add ₹{(500 - subtotal).toFixed(0)} more to get FREE delivery!
                      </p>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg sm:text-xl">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">₹{total.toFixed(0)}</span>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">Inclusive of all taxes</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 shadow-lg"
                  size="lg"
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <p className="text-xs text-center text-muted-foreground">Safe and secure checkout</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
