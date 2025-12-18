import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileTab } from "@/components/dashboard/profile-tab"
import { AddressesTab } from "@/components/dashboard/addresses-tab"
import { FavoritesTab } from "@/components/dashboard/favorites-tab"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const addresses = await sql`
    SELECT * FROM addresses WHERE user_id = ${user.id} ORDER BY is_default DESC, created_at DESC
  `

  const favorites = await sql`
    SELECT m.*, c.name as category_name,
           COALESCE(AVG(r.rating), 0) as avg_rating,
           COUNT(r.id) as review_count
    FROM favorites f
    JOIN meals m ON f.meal_id = m.id
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN reviews r ON m.id = r.meal_id
    WHERE f.user_id = ${user.id}
    GROUP BY m.id, c.name, f.created_at
    ORDER BY f.created_at DESC
  `

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab user={user} />
          </TabsContent>

          <TabsContent value="addresses">
            <AddressesTab addresses={addresses} />
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesTab meals={favorites} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
