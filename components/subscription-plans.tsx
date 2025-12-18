"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { subscribeToPlansAction } from "@/app/actions/subscriptions"

interface Plan {
  id: number
  name: string
  description: string
  price: number
  meals_per_week: number
  discount_percentage: number
}

interface SubscriptionPlansProps {
  plans: Plan[]
  hasActiveSubscription: boolean
  userId?: number
}

export function SubscriptionPlans({ plans, hasActiveSubscription, userId }: SubscriptionPlansProps) {
  const router = useRouter()

  async function handleSubscribe(planId: number) {
    if (!userId) {
      router.push("/login")
      return
    }

    await subscribeToPlansAction(planId)
    router.refresh()
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <Card key={plan.id} className={index === 1 ? "border-primary shadow-lg" : ""}>
          <CardHeader>
            {index === 1 && (
              <Badge className="w-fit mb-2" variant="default">
                Most Popular
              </Badge>
            )}
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-4xl font-bold">${Number(plan.price).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">per week</div>
              {plan.discount_percentage > 0 && (
                <Badge variant="secondary" className="mt-2">
                  Save {plan.discount_percentage}%
                </Badge>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">{plan.meals_per_week} meals per week</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">Flexible delivery schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">Free delivery</span>
              </div>
              {plan.discount_percentage > 0 && (
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">Priority customer support</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={index === 1 ? "default" : "outline"}
              onClick={() => handleSubscribe(plan.id)}
              disabled={hasActiveSubscription}
            >
              {hasActiveSubscription ? "Already Subscribed" : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
