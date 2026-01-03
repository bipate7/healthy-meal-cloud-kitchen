"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Gift, Users, IndianRupee, Share2, Copy, Check } from "lucide-react"
import { useState } from "react"

export function ReferralProgram() {
  const [copied, setCopied] = useState(false)
  const referralCode = "HEALTHY2024"

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Gift className="h-3 w-3 mr-1" />
              Referral Program
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Give ₹100, Get <span className="text-blue-600">₹100</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Share the health! Invite friends and you both get ₹100 credit on your next order.
            </p>
          </div>

          <Card className="p-8 md:p-12 shadow-2xl border-2 border-blue-200 mb-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Share Your Link</h3>
                <p className="text-sm text-gray-600">Send your unique referral code to friends</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Friend Orders</h3>
                <p className="text-sm text-gray-600">They get ₹100 off their first order</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. You Get Rewarded</h3>
                <p className="text-sm text-gray-600">Receive ₹100 credit automatically</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Referral Code</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  value={referralCode}
                  readOnly
                  className="flex-1 bg-white border-2 border-blue-300 font-mono text-lg text-center font-bold"
                />
                <Button onClick={handleCopy} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Card className="p-6 border-2 border-blue-100">
              <p className="text-4xl font-bold text-blue-600 mb-2">24</p>
              <p className="text-gray-600">Friends Referred</p>
            </Card>
            <Card className="p-6 border-2 border-green-100">
              <p className="text-4xl font-bold text-green-600 mb-2">₹2,400</p>
              <p className="text-gray-600">Total Earned</p>
            </Card>
            <Card className="p-6 border-2 border-purple-100">
              <p className="text-4xl font-bold text-purple-600 mb-2">₹800</p>
              <p className="text-gray-600">Available Credit</p>
            </Card>
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" className="mx-auto" asChild>
              <a href="/referrals">Learn More</a>
            </Button>
            <Button className="ml-3 bg-primary" asChild>
              <a href="/signup">Start Referring</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
