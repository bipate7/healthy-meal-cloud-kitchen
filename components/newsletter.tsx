"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add newsletter subscription logic
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border-2 border-primary/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance">
              Get <span className="text-primary">10% Off</span> Your First Order
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto text-balance px-4">
              Subscribe to our newsletter for exclusive deals, healthy recipes, and nutrition tips delivered to your
              inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 sm:h-14 text-base border-2"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base font-semibold whitespace-nowrap"
                disabled={subscribed}
              >
                {subscribed ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Subscribed!
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>

            <p className="text-xs sm:text-sm text-muted-foreground mt-4">
              No spam. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
