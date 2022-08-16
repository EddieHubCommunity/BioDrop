/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "github.com",
      "avatars.githubusercontent.com",
      "user-images.githubusercontent.com",
      "cdn.nhcarrigan.com",
      "d1aettbyeyfilo.cloudfront.net"
    ],
  },
};

module.exports = nextConfig;
