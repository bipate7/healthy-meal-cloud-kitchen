"use server"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoyaltyProgram } from "@/components/loyalty-program"
import { getCurrentUser } from "@/lib/auth"

export default async function LoyaltyProgramPage() {
  const user = await getCurrentUser()
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="pt-24">
        <LoyaltyProgram />
      </main>
      <Footer />
    </div>
  )
}

