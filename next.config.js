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
};

module.exports = nextConfig;
