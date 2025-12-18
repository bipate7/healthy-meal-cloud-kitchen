import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get("unread") === "true"

    let query = `
      SELECT *
      FROM notifications
      WHERE user_id = $1
    `

    if (unreadOnly) {
      query += ` AND is_read = false`
    }

    query += ` ORDER BY created_at DESC LIMIT 20`

    const notifications = await sql(query, [user.id])

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("[v0] Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { notificationId, isRead } = await request.json()

    await sql`
      UPDATE notifications
      SET is_read = ${isRead}, updated_at = NOW()
      WHERE id = ${notificationId} AND user_id = ${user.id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating notification:", error)
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}
