/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "github.com",
      "avatars.githubusercontent.com",
      "user-images.githubusercontent.com",
      "camo.githubusercontent.com",
      "cdn.nhcarrigan.com",
      "avatars.dicebear.com",
    ],
    formats: ["image/webp"],
  },
  compress: true,
};

module.exports = nextConfig;
