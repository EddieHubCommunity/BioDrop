const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

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
module.exports = withMDX({
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
