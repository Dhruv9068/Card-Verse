/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["picsum.photos", "images.unsplash.com"],
    unoptimized: true,
  },
  // This is important for Netlify deployments
  trailingSlash: true,
  // Ensure we handle all routes properly
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
