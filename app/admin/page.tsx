import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Users, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminPage() {
  const user = await getCurrentUser()
  if (!user || !user.is_admin) {
    redirect("/")
  }

  const stats = await sql`
    SELECT 
      (SELECT COUNT(*) FROM orders WHERE status != 'cancelled') as total_orders,
      (SELECT COUNT(*) FROM users WHERE is_admin = false) as total_users,
      (SELECT SUM(total_amount) FROM orders WHERE status != 'cancelled') as total_revenue,
      (SELECT COUNT(*) FROM orders WHERE status = 'pending') as pending_orders
  `

  const recentOrders = await sql`
    SELECT o.*, u.name as user_name, u.email as user_email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
    LIMIT 10
  `

  const { total_orders, total_users, total_revenue, pending_orders } = stats[0]

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/meals">Manage Meals</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/orders">All Orders</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total_orders}</div>
              <p className="text-xs text-muted-foreground">{pending_orders} pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total_users}</div>
              <p className="text-xs text-muted-foreground">Active customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Number(total_revenue || 0).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${total_orders > 0 ? (Number(total_revenue) / Number(total_orders)).toFixed(2) : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground">Per order</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Link key={order.id} href={`/admin/orders/${order.id}`}>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium">
                        Order #{order.id} - {order.user_name}
                      </div>
                      <div className="text-sm text-muted-foreground">{order.user_email}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${Number(order.total_amount).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground capitalize">{order.status.replace("_", " ")}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
