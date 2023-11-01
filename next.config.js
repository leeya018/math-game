/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: `http://localhost:${process.env.NEXT_PUBLIC_PORT}/`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
