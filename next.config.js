/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Only for RCC
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/:path*` // Proxy to Backend
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.sendbird.com",
      },
      {
        protocol: "https",
        hostname: "sendbird.com",
      },
    ],
  },
};

module.exports = nextConfig;
