"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus } from "lucide-react"
import { addAddress, deleteAddress, setDefaultAddress } from "@/app/actions/addresses"

interface Address {
  id: number
  address_line1: string
  address_line2: string
  city: string
  state: string
  zip_code: string
  is_default: boolean
}

interface AddressesTabProps {
  addresses: Address[]
}

export function AddressesTab({ addresses }: AddressesTabProps) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await addAddress(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setShowForm(false)
      router.refresh()
    }
    setLoading(false)
  }

  async function handleDelete(addressId: number) {
    if (!confirm("Are you sure you want to delete this address?")) return

    await deleteAddress(addressId)
    router.refresh()
  }

  async function handleSetDefault(addressId: number) {
    await setDefaultAddress(addressId)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address_line1">Address Line 1</Label>
                <Input id="address_line1" name="address_line1" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address_line2">Address Line 2 (optional)</Label>
                <Input id="address_line2" name="address_line2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip_code">ZIP Code</Label>
                <Input id="zip_code" name="zip_code" required />
              </div>
              {error && <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</div>}
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Address"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="font-medium">{address.address_line1}</div>
                  {address.address_line2 && (
                    <div className="text-sm text-muted-foreground">{address.address_line2}</div>
                  )}
                  <div className="text-sm text-muted-foreground">
                    {address.city}, {address.state} {address.zip_code}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(address.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {address.is_default ? (
                <Badge>Default</Badge>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                  Set as Default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && !showForm && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No saved addresses yet. Add one to make checkout faster!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
