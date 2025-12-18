"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Flame, Sparkles } from "lucide-react"

export function LimitedTimeOffers() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const offers = [
    {
      title: "Diwali Dhamaka",
      description: "Buy 5 meals, get 2 FREE + special mithai",
      discount: "40% OFF",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "New Customer Offer",
      description: "First order flat ₹200 off on orders above ₹500",
      discount: "₹200 OFF",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Weekly Meal Plan",
      description: "7-day healthy meal plan subscription",
      discount: "35% OFF",
      color: "from-purple-500 to-pink-600",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-200 animate-pulse">
            <Flame className="h-3 w-3 mr-1" />
            Flash Deals
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Limited Time <span className="text-red-600">Offers</span>
          </h2>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Clock className="h-5 w-5 text-gray-600" />
            <div className="flex gap-2">
              {[
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, index) => (
                <div key={item.label}>
                  <div className="bg-white rounded-lg px-4 py-2 shadow-lg border-2 border-red-200">
                    <span className="text-2xl font-bold text-red-600">{String(item.value).padStart(2, "0")}</span>
                    <p className="text-xs text-gray-600 uppercase">{item.label}</p>
                  </div>
                  {index < 2 && <span className="text-2xl font-bold text-gray-400 mx-1">:</span>}
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-600">Hurry! These deals won't last long</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <Card
              key={offer.title}
              className="relative overflow-hidden border-2 border-transparent hover:border-red-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInScale 0.6s ease-out forwards",
                opacity: 0,
              }}
            >
              <div
                className={`absolute top-0 right-0 px-6 py-2 bg-gradient-to-r ${offer.color} text-white font-bold text-lg rounded-bl-2xl flex items-center gap-2`}
              >
                <Sparkles className="h-4 w-4" />
                {offer.discount}
              </div>

              <div className="p-8 pt-16">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">{offer.title}</h3>
                <p className="text-gray-600 mb-6">{offer.description}</p>
                <Button
                  className={`w-full bg-gradient-to-r ${offer.color} text-white border-0 hover:opacity-90 group-hover:scale-105 transition-transform`}
                >
                  Claim Offer Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
