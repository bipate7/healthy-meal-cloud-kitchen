import { getOrder } from "@/app/actions/orders"
import { Header } from "@/components/header"
import { getCurrentUser } from "@/lib/auth"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params
  const user = await getCurrentUser()
  const order = await getOrder(Number(id))

  if (!order) {
    notFound()
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-purple-100 text-purple-800",
    out_for_delivery: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            <Badge className={statusColors[order.status]}>{order.status.replace("_", " ").toUpperCase()}</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div>{order.address_line1}</div>
                  {order.address_line2 && <div>{order.address_line2}</div>}
                  <div>
                    {order.city}, {order.state} {order.zip_code}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-medium">{new Date(order.delivery_date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className="font-medium capitalize">{order.delivery_time}</div>
                  </div>
                  {order.special_instructions && (
                    <div>
                      <div className="text-sm text-muted-foreground">Special Instructions</div>
                      <div className="font-medium">{order.special_instructions}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                    <div className="font-medium">${(Number(item.price) * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold">${Number(order.total_amount).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Button asChild>
              <Link href="/orders">View All Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
