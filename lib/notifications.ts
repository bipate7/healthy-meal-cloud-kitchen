import sql from "./db"

export async function createNotification(
  userId: number,
  title: string,
  message: string,
  type: "order" | "promotion" | "system" = "system",
  metadata?: any,
) {
  try {
    await sql`
      INSERT INTO notifications (
        user_id,
        title,
        message,
        type,
        metadata,
        created_at
      ) VALUES (
        ${userId},
        ${title},
        ${message},
        ${type},
        ${metadata ? JSON.stringify(metadata) : null},
        NOW()
      )
    `
  } catch (error) {
    console.error("[v0] Error creating notification:", error)
  }
}

export async function notifyOrderStatusChange(orderId: number, newStatus: string) {
  try {
    const [order] = await sql`
      SELECT user_id FROM orders WHERE id = ${orderId}
    `

    if (order) {
      const statusMessages: Record<string, string> = {
        confirmed: "Your order has been confirmed and is being prepared!",
        preparing: "Our chefs are preparing your delicious meal!",
        ready: "Your order is ready for pickup/delivery!",
        out_for_delivery: "Your order is on its way to you!",
        delivered: "Your order has been delivered. Enjoy your meal!",
        cancelled: "Your order has been cancelled.",
      }

      await createNotification(
        order.user_id,
        "Order Update",
        statusMessages[newStatus] || "Your order status has been updated.",
        "order",
        { orderId, status: newStatus },
      )
    }
  } catch (error) {
    console.error("[v0] Error notifying order status change:", error)
  }
}
