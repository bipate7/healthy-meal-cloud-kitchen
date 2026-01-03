"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Gift, Star, Trophy, Crown, Zap } from "lucide-react"

const tiers = [
  {
    name: "Bronze",
    icon: Star,
    color: "from-amber-600 to-amber-800",
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
    orders: "0-10 orders",
    benefits: ["5% cashback", "Birthday treat", "Early access to new meals"],
  },
  {
    name: "Silver",
    icon: Trophy,
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
    orders: "11-25 orders",
    benefits: ["10% cashback", "Free delivery", "Priority support", "Exclusive recipes"],
  },
  {
    name: "Gold",
    icon: Crown,
    color: "from-yellow-500 to-yellow-700",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
    orders: "26+ orders",
    benefits: ["15% cashback", "Free upgrades", "VIP events", "Chef consultation", "Custom meals"],
  },
]

export function LoyaltyProgram() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Gift className="h-3 w-3 mr-1" />
            Rewards Program
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Earn While You <span className="text-purple-600">Eat Healthy</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our loyalty program and unlock exclusive rewards, cashback, and perks with every order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, index) => {
            const Icon = tier.icon
            return (
              <Card
                key={tier.name}
                className="p-8 border-2 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden group"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                  opacity: 0,
                }}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tier.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
                />

                <div className="relative">
                  <div
                    className={`${tier.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`h-8 w-8 ${tier.textColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tier.name} Tier</h3>
                  <p className="text-sm text-gray-600 mb-6">{tier.orders}</p>

                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Join Free Today</h3>
                <p className="text-purple-100">Start earning rewards with your first order</p>
              </div>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                <a href="/signup">Sign Up Now</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
