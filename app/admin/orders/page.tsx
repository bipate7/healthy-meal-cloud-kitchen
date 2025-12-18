import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { Header } from "@/components/header"
import { AdminOrdersList } from "@/components/admin/admin-orders-list"

export default async function AdminOrdersPage() {
  const user = await getCurrentUser()
  if (!user || !user.is_admin) {
    redirect("/")
  }

  const orders = await sql`
    SELECT o.*, u.name as user_name, u.email as user_email,
           COUNT(oi.id) as item_count
    FROM orders o
    JOIN users u ON o.user_id = u.id
    LEFT JOIN order_items oi ON o.id = oi.order_id
    GROUP BY o.id, u.name, u.email
    ORDER BY o.created_at DESC
  `

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Orders</h1>
        <AdminOrdersList orders={orders} />
      </div>
    </div>
  )
}
