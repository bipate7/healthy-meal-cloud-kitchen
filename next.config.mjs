/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Correct way to disable Turbopack
  turbopack: false,
};

export default nextConfig;
