/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: false, // This forces Webpack for builds (Turbopack remains optional for local dev)
};

module.exports = nextConfig;
