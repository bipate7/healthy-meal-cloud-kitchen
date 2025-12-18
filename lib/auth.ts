import bcrypt from "bcryptjs";
import sql from "./db";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string | null;
  is_admin: boolean;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: User) {
  const token = await new SignJWT({ userId: user.id, isAdmin: user.is_admin })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession(): Promise<{
  userId: number;
  isAdmin: boolean;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as { userId: number; isAdmin: boolean };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;

  const result = await sql`
    SELECT id, email, name, phone, is_admin
    FROM users
    WHERE id = ${session.userId}
  `;

  // Safe and clean: check length and cast once
  return result.length > 0 ? (result[0] as User) : null;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
export async function verifyAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
