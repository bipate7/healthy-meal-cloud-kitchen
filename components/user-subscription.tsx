"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cancelSubscription } from "@/app/actions/subscriptions"

interface Subscription {
  id: number
  plan_name: string
  meals_per_week: number
  price: number
  discount_percentage: number
  status: string
  start_date: string
  next_billing_date: string
}

interface UserSubscriptionProps {
  subscription: Subscription
}

export function UserSubscription({ subscription }: UserSubscriptionProps) {
  const router = useRouter()

  async function handleCancel() {
    if (!confirm("Are you sure you want to cancel your subscription?")) return

    await cancelSubscription(subscription.id)
    router.refresh()
  }

  return (
    <Card className="mb-8 border-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Active Subscription</CardTitle>
          <Badge variant="default">Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Plan</div>
            <div className="font-semibold text-lg">{subscription.plan_name}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="font-semibold text-lg">${Number(subscription.price).toFixed(2)}/week</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Meals per Week</div>
            <div className="font-semibold">{subscription.meals_per_week} meals</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Discount</div>
            <div className="font-semibold">{subscription.discount_percentage}% off</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Started</div>
            <div className="font-semibold">{new Date(subscription.start_date).toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Next Billing</div>
            <div className="font-semibold">{new Date(subscription.next_billing_date).toLocaleDateString()}</div>
          </div>
        </div>
        <Button variant="destructive" onClick={handleCancel}>
          Cancel Subscription
        </Button>
      </CardContent>
    </Card>
  )
}
