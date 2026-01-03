"use server"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CorporateCatering } from "@/components/corporate-catering"
import { getCurrentUser } from "@/lib/auth"

export default async function CorporateCateringPage() {
  const user = await getCurrentUser()
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="pt-24">
        <CorporateCatering />
      </main>
      <Footer />
    </div>
  )
}

