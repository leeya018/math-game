/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ["lh3.googleusercontent.com", "math-game-lee.netlify.app"],
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
