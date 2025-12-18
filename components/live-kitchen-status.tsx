"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Flame, CheckCircle2 } from "lucide-react"

export function LiveKitchenStatus() {
  const [ordersInProgress, setOrdersInProgress] = useState(12)
  const [chefsOnline, setChefsOnline] = useState(5)
  const [avgPrepTime, setAvgPrepTime] = useState(25)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrdersInProgress((prev) => Math.max(8, Math.min(20, prev + Math.floor(Math.random() * 3) - 1)))
      setChefsOnline((prev) => Math.max(3, Math.min(8, prev + Math.floor(Math.random() * 2) - 0.5)))
      setAvgPrepTime((prev) => Math.max(20, Math.min(35, prev + Math.floor(Math.random() * 3) - 1)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-8 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-y border-green-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping" />
              <div className="relative bg-green-500 p-2 rounded-full">
                <Flame className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
                  LIVE
                </Badge>
                <p className="text-sm font-medium text-gray-700">Kitchen Active</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{ordersInProgress}</p>
              <p className="text-sm text-gray-600">Orders in Progress</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{chefsOnline}</p>
              <p className="text-sm text-gray-600">Chefs Online</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{avgPrepTime} min</p>
              <p className="text-sm text-gray-600">Avg Prep Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
