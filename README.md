# HealthyMeal Cloud Kitchen

A modern cloud-kitchen web app for discovering meals, adding them to cart, subscribing to plans, and managing orders. Built with Next.js App Router, Neon PostgreSQL, Tailwind CSS, and server actions.

## Features
- Home page with dynamic “This Week’s Menu” sourced from the database
- Add to Cart for guest users via HTTP-only cookies
- Categories, full menu browsing, ratings, nutrition info
- Authentication session with JWT stored in cookies
- Admin pages for managing meals and orders (scaffolded)
- Fully responsive UI with shadcn/ui components

## Tech Stack
- Next.js 16 (App Router, Server Actions)
- React 19
- Tailwind CSS
- Neon PostgreSQL via `@neondatabase/serverless`
- shadcn/ui (Radix UI primitives)
- TypeScript

## Project Structure
- App pages and server actions:
  - Home: [app/page.tsx](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/app/page.tsx)
  - Cart actions: [app/actions/cart.ts](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/app/actions/cart.ts)
  - Meals actions (DB queries): [app/actions/meals.ts](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/app/actions/meals.ts)
- Shared layout:
  - Root layout with Toaster: [app/layout.tsx](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/app/layout.tsx)
- UI components:
  - Header (shows cart count, auth buttons): [components/header.tsx](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/components/header.tsx)
  - This Week’s Menu preview (Add to Cart): [components/menu-preview.tsx](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/components/menu-preview.tsx)
- Database and auth helpers:
  - Neon connection: [lib/db.ts](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/lib/db.ts)
  - Auth utilities: [lib/auth.ts](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/lib/auth.ts)
- SQL scripts:
  - Create tables: [scripts/01-create-tables.sql](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/scripts/01-create-tables.sql)
  - Seed data: [scripts/02-seed-data.sql](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/scripts/02-seed-data.sql)

## Requirements
- Node.js 18+ (recommended LTS) or Vercel runtime
- A Neon PostgreSQL database (serverless, free tier OK)

## Environment Variables
Create a `.env.local` file in the project root:

```bash
# Required
DATABASE_URL="postgres://USER:PASSWORD@HOST/DB?sslmode=require"
JWT_SECRET="replace-with-a-long-random-secret"
```

- `DATABASE_URL` is the Neon connection string; ensure `sslmode=require`.
- `JWT_SECRET` is used to sign session tokens.

## Database Setup (Neon)
1. Create a Neon project and database.
2. In Neon’s SQL editor, run:
   - Create tables: contents of [scripts/01-create-tables.sql](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/scripts/01-create-tables.sql)
   - Seed data: contents of [scripts/02-seed-data.sql](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/scripts/02-seed-data.sql)
3. Verify some meals exist (so Home shows menu items).

## Install & Run Locally
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# App runs at http://localhost:3000
```

## Build & Start (Production)
```bash
# Build
npm run build

# Start
npm run start
```

## Deployment (Vercel)
1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel:
   - Create a new project and import this repo.
   - Set these environment variables in Project → Settings → Environment Variables:
     - `DATABASE_URL` = your Neon connection string
     - `JWT_SECRET` = a long random string
   - Build command auto-detected: `next build`.
3. Deploy. Vercel will build and publish automatically on each push to the default branch.

## How It Works
- Meals fetch on Home: [app/page.tsx](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/app/page.tsx) calls `getMeals` and passes the top items to [components/menu-preview.tsx](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/components/menu-preview.tsx).
- Database queries: [app/actions/meals.ts](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/app/actions/meals.ts) uses Neon’s `sql.query()` for parameterized queries.
- Cart for guest users: [app/actions/cart.ts](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/app/actions/cart.ts) stores items in an HTTP‑only cookie.
- Toast notifications: Toaster is mounted in [app/layout.tsx](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/app/layout.tsx) so user feedback appears globally.

## Troubleshooting
- Missing env variables:
  - Ensure `DATABASE_URL` and `JWT_SECRET` are set in `.env.local` (local) and in Vercel project settings (production).
- Database empty:
  - Seed your Neon DB using the SQL scripts so the Home page can display meals.
- Neon driver errors:
  - Use `sql.query("SELECT ...", [params])` for dynamic queries. See [app/actions/meals.ts](file:///c:/Users/VICTUS/Desktop/JAVA/healthy-meal-cloud-kitchen/app/actions/meals.ts#L66-L74).
- Workspace root warnings in dev:
  - Harmless locally. In CI/Vercel only your repo root is used.

## Scripts
Common scripts from `package.json`:
```bash
npm run dev     # Start Next.js dev server
npm run build   # Build production
npm run start   # Start production server
npm run lint    # Lint the project
```

