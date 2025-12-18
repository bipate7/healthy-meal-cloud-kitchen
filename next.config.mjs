/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // Disable Turbopack for production builds (Vercel) to avoid the previous bug
  turbopack: false,
};

export default nextConfig;
