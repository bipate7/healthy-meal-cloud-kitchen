import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function OrdersPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const orders = await sql`
    SELECT o.*, 
           COUNT(oi.id) as item_count
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = ${user.id}
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `

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
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">Start ordering delicious healthy meals today!</p>
              <Button asChild>
                <Link href="/">Browse Menu</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                          <Badge className={statusColors[order.status]}>
                            {order.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>Placed on {new Date(order.created_at).toLocaleDateString()}</div>
                          <div>
                            Delivery: {new Date(order.delivery_date).toLocaleDateString()} ({order.delivery_time})
                          </div>
                          <div>
                            {order.item_count} {order.item_count === 1 ? "item" : "items"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${Number(order.total_amount).toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground mt-1">Total</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
