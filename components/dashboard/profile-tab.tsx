"use client"

import type React from "react"
import type { User } from "@/lib/auth"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfile } from "@/app/actions/profile"

interface ProfileTabProps {
  user: User
}

export function ProfileTab({ user }: ProfileTabProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await updateProfile(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={user.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={user.email} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" defaultValue={user.phone || ""} />
          </div>
          {error && <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</div>}
          {success && (
            <div className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">Profile updated successfully!</div>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
