/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // Disable Turbopack only for production builds (Vercel)
  // Local `next dev` can still use Turbopack for speed
  ...(process.env.NODE_ENV === "production" && { turbopack: false }),
};

export default nextConfig;
