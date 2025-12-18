"use client"
import { Shield, Award, Leaf, CheckCircle2, Lock, Heart } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "FDA Approved",
    description: "Certified food safety standards",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Award,
    title: "ISO 22000",
    description: "Food safety management",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: Leaf,
    title: "Organic Certified",
    description: "100% organic ingredients",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: CheckCircle2,
    title: "HACCP Certified",
    description: "Hazard analysis control",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "PCI DSS compliant",
    color: "bg-gray-100 text-gray-700",
  },
  {
    icon: Heart,
    title: "Nutritionist Approved",
    description: "Expert meal planning",
    color: "bg-pink-100 text-pink-700",
  },
]

export function TrustBadges() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Trusted & Certified</h3>
          <p className="text-gray-600">Your health and safety is our top priority</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeIn 0.6s ease-out forwards",
                  opacity: 0,
                }}
              >
                <div
                  className={`${badge.color} w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-sm text-gray-900 mb-1">{badge.title}</h4>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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
