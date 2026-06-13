/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "http2.mlstatic.com"
      },
      {
        protocol: "https",
        hostname: "images.mercadolivre.com.br"
      },
      {
        protocol: "https",
        hostname: "placehold.co"
      }
    ]
  }
};

module.exports = nextConfig;
