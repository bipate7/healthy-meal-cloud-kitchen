import { type NextRequest, NextResponse } from "next/server"
import sql from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth()
    const { event, data } = await request.json()

    // Log analytics event
    await sql`
      INSERT INTO analytics_events (
        user_id,
        event_type,
        event_data,
        created_at
      ) VALUES (
        ${user?.id || null},
        ${event},
        ${JSON.stringify(data)},
        NOW()
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error tracking analytics:", error)
    // Don't fail the request if analytics fails
    return NextResponse.json({ success: true })
  }
}
