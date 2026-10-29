import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "omniastores.com",
      },
      {
        protocol: "https",
        hostname: "omniastores.ae",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/omniastores-ae',
        destination: 'https://omniastores.com',
        permanent: true,
      },
      {
        source: '/store-ae/:path*',
        destination: 'https://omniastores.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
