"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateOrderStatus } from "@/app/actions/admin"
import Link from "next/link"

interface Order {
  id: number
  user_name: string
  user_email: string
  total_amount: number
  status: string
  delivery_date: string
  delivery_time: string
  created_at: string
  item_count: number
}

interface AdminOrdersListProps {
  orders: Order[]
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  out_for_delivery: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export function AdminOrdersList({ orders }: AdminOrdersListProps) {
  const router = useRouter()
  const [updatingOrder, setUpdatingOrder] = useState<number | null>(null)

  async function handleStatusChange(orderId: number, newStatus: string) {
    setUpdatingOrder(orderId)
    await updateOrderStatus(orderId, newStatus)
    setUpdatingOrder(null)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Link href={`/admin/orders/${order.id}`}>
                    <h3 className="font-semibold text-lg hover:text-primary">Order #{order.id}</h3>
                  </Link>
                  <Badge className={statusColors[order.status]}>{order.status.replace("_", " ").toUpperCase()}</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>
                    Customer: {order.user_name} ({order.user_email})
                  </div>
                  <div>Placed: {new Date(order.created_at).toLocaleDateString()}</div>
                  <div>
                    Delivery: {new Date(order.delivery_date).toLocaleDateString()} ({order.delivery_time})
                  </div>
                  <div>
                    {order.item_count} {order.item_count === 1 ? "item" : "items"}
                  </div>
                </div>
              </div>
              <div className="text-right space-y-3">
                <div>
                  <div className="text-2xl font-bold">${Number(order.total_amount).toFixed(2)}</div>
                </div>
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                  disabled={updatingOrder === order.id}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
