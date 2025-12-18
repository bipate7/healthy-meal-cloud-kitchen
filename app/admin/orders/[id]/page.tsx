import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { Header } from "@/components/header"
import { AdminOrderDetail } from "@/components/admin/admin-order-detail"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user || !user.is_admin) {
    redirect("/")
  }

  const orderResult = await sql`
    SELECT o.*, 
           u.name as user_name,
           u.email as user_email,
           u.phone as user_phone,
           a.address_line1,
           a.address_line2,
           a.city,
           a.state,
           a.zip_code
    FROM orders o
    JOIN users u ON o.user_id = u.id
    LEFT JOIN addresses a ON o.address_id = a.id
    WHERE o.id = ${id}
  `

  if (orderResult.length === 0) {
    notFound()
  }

  const order = orderResult[0]

  const items = await sql`
    SELECT oi.*, m.name, m.image_url
    FROM order_items oi
    JOIN meals m ON oi.meal_id = m.id
    WHERE oi.order_id = ${id}
  `

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <AdminOrderDetail order={{ ...order, items }} />
    </div>
  )
}
