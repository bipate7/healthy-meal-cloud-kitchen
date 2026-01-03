"use server"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReferralProgram } from "@/components/referral-program"
import { getCurrentUser } from "@/lib/auth"

export default async function ReferralsPage() {
  const user = await getCurrentUser()
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="pt-24">
        <ReferralProgram />
      </main>
      <Footer />
    </div>
  )
}

