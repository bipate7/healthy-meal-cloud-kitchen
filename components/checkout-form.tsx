"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { placeOrder } from "@/app/actions/orders"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Address {
  id: number
  address_line1: string
  address_line2: string
  city: string
  state: string
  zip_code: string
  is_default: boolean
}

interface CheckoutFormProps {
  items: CartItem[]
  addresses: Address[]
  total: number
}

export function CheckoutForm({ items, addresses, total }: CheckoutFormProps) {
  const router = useRouter()
  const [selectedAddress, setSelectedAddress] = useState<number | null>(addresses[0]?.id || null)
  const [showNewAddress, setShowNewAddress] = useState(addresses.length === 0)
  const [deliveryDate, setDeliveryDate] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("morning")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)

    if (!deliveryDate) {
      setError("Please select a delivery date")
      setLoading(false)
      return
    }

    const result = await placeOrder(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push(`/orders/${result.orderId}`)
    }
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split("T")[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {addresses.length > 0 && !showNewAddress && (
                  <>
                    <RadioGroup
                      value={selectedAddress?.toString()}
                      onValueChange={(val) => setSelectedAddress(Number(val))}
                    >
                      {addresses.map((address) => (
                        <div key={address.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                          <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} />
                          <label htmlFor={`address-${address.id}`} className="flex-1 cursor-pointer">
                            <div className="font-medium">{address.address_line1}</div>
                            {address.address_line2 && (
                              <div className="text-sm text-muted-foreground">{address.address_line2}</div>
                            )}
                            <div className="text-sm text-muted-foreground">
                              {address.city}, {address.state} {address.zip_code}
                            </div>
                            {address.is_default && (
                              <div className="text-xs text-primary font-medium mt-1">Default Address</div>
                            )}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    <input type="hidden" name="address_id" value={selectedAddress || ""} />
                    <Button type="button" variant="outline" onClick={() => setShowNewAddress(true)} className="w-full">
                      Use a Different Address
                    </Button>
                  </>
                )}

                {(showNewAddress || addresses.length === 0) && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address_line1">Address Line 1</Label>
                      <Input id="address_line1" name="address_line1" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address_line2">Address Line 2 (optional)</Label>
                      <Input id="address_line2" name="address_line2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip_code">ZIP Code</Label>
                      <Input id="zip_code" name="zip_code" required />
                    </div>
                    {addresses.length > 0 && (
                      <Button type="button" variant="outline" onClick={() => setShowNewAddress(false)}>
                        Use Saved Address
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery_date">Delivery Date</Label>
                  <Input
                    type="date"
                    id="delivery_date"
                    name="delivery_date"
                    min={minDateStr}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Next-day delivery available</p>
                </div>

                <div className="space-y-2">
                  <Label>Delivery Time</Label>
                  <RadioGroup value={deliveryTime} onValueChange={setDeliveryTime}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="morning" id="morning" />
                      <label htmlFor="morning" className="cursor-pointer">
                        Morning (8 AM - 12 PM)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="afternoon" id="afternoon" />
                      <label htmlFor="afternoon" className="cursor-pointer">
                        Afternoon (12 PM - 4 PM)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="evening" id="evening" />
                      <label htmlFor="evening" className="cursor-pointer">
                        Evening (4 PM - 8 PM)
                      </label>
                    </div>
                  </RadioGroup>
                  <input type="hidden" name="delivery_time" value={deliveryTime} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special_instructions">Special Instructions (optional)</Label>
                  <Textarea
                    id="special_instructions"
                    name="special_instructions"
                    placeholder="Leave at door, ring doorbell, etc."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${(total / 1.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${(total - total / 1.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</div>
                )}
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Placing Order..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
