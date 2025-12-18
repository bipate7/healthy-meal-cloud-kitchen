// Email service integration (placeholder for production email service)
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    // In production, integrate with services like:
    // - SendGrid
    // - AWS SES
    // - Postmark
    // - Resend

    console.log("[v0] Email would be sent:", { to, subject })

    // Example integration with a service:
    // await fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     personalizations: [{ to: [{ email: to }] }],
    //     from: { email: 'noreply@healthymeal.com' },
    //     subject,
    //     content: [{ type: 'text/html', value: html }],
    //   }),
    // })

    return { success: true }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return { success: false, error }
  }
}

export async function sendOrderConfirmationEmail(orderId: number) {
  try {
    const [order] = await sql`
      SELECT o.*, u.email, u.name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = ${orderId}
    `

    if (!order) return

    const html = `
      <h1>Order Confirmation</h1>
      <p>Dear ${order.name},</p>
      <p>Your order #${orderId} has been confirmed!</p>
      <p>Total: ₹${order.total_amount}</p>
      <p>Delivery Date: ${order.delivery_date}</p>
      <p>Thank you for choosing HealthyMeal!</p>
    `

    await sendEmail(order.email, `Order Confirmation #${orderId}`, html)
  } catch (error) {
    console.error("[v0] Error sending order confirmation email:", error)
  }
}

import sql from "./db"
