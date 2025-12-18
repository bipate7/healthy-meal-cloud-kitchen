"use server"

import { hashPassword, verifyPassword, createSession, logout as logoutSession } from "@/lib/auth"
import sql from "@/lib/db"
import { redirect } from "next/navigation"
import { z } from "zod"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function signup(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      phone: formData.get("phone") as string,
    }

    const validated = signupSchema.parse(data)

    // Check if user already exists
    const existing = await sql`
      SELECT id FROM users WHERE email = ${validated.email}
    `

    if (existing.length > 0) {
      return { error: "Email already registered" }
    }

    // Hash password and create user
    const passwordHash = await hashPassword(validated.password)
    const result = await sql`
      INSERT INTO users (email, password_hash, name, phone)
      VALUES (${validated.email}, ${passwordHash}, ${validated.name}, ${validated.phone || null})
      RETURNING id, email, name, phone, is_admin
    `

    const user = result[0]
    await createSession(user)

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: "Failed to create account" }
  }
}

export async function login(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const validated = loginSchema.parse(data)

    // Find user
    const result = await sql`
      SELECT id, email, password_hash, name, phone, is_admin
      FROM users
      WHERE email = ${validated.email}
    `

    if (result.length === 0) {
      return { error: "Invalid email or password" }
    }

    const user = result[0]

    // Verify password
    const isValid = await verifyPassword(validated.password, user.password_hash)
    if (!isValid) {
      return { error: "Invalid email or password" }
    }

    // Create session
    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      is_admin: user.is_admin,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: "Failed to log in" }
  }
}

export async function logout() {
  await logoutSession()
  redirect("/login")
}
