"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Building2, Users, Calendar, TrendingUp, CheckCircle2 } from "lucide-react"

const features = [
  "Customizable meal plans for your team",
  "Flexible delivery schedules",
  "Volume discounts available",
  "Dedicated account manager",
  "Invoicing & expense reports",
  "Dietary accommodations included",
]

const benefits = [
  {
    icon: TrendingUp,
    title: "Boost Productivity",
    description: "Healthy employees are 25% more productive",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Users,
    title: "Team Satisfaction",
    description: "90% of employees value meal benefits",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Calendar,
    title: "Save Time",
    description: "No more lunch planning or coordination",
    color: "bg-purple-100 text-purple-700",
  },
]

export function CorporateCatering() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Building2 className="h-3 w-3 mr-1" />
              For Business
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Corporate <span className="text-blue-600">Catering Solutions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Power your team with nutritious meals. Perfect for offices, events, and meetings.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-2 border-blue-200 shadow-xl">
              <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card
                    key={benefit.title}
                    className="p-6 border-2 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: "fadeInRight 0.6s ease-out forwards",
                      opacity: 0,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`${benefit.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 shadow-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Fuel Your Team?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a custom quote for your organization. Minimum 10 meals per order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <a href="/contact?topic=corporate-quote">Request a Quote</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a href="/contact?topic=demo">Schedule Demo</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}
