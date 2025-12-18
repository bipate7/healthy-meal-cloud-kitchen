"use client"

import { X, Sparkles } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AdvertisementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between py-2.5 sm:py-3 gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 animate-pulse" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
              <p className="text-xs sm:text-sm font-semibold truncate">🎉 Limited Time Offer!</p>
              <p className="text-xs sm:text-sm truncate">
                Get <span className="font-bold">30% OFF</span> on your first subscription + Free delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant="secondary"
              className="text-xs sm:text-sm font-semibold whitespace-nowrap px-3 sm:px-4 h-7 sm:h-8"
              asChild
            >
              <Link href="/subscriptions">Claim Offer</Link>
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded-md transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
