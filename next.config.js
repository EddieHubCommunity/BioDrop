const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("remark-prism")],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.nhcarrigan.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.dicebear.com",
        port: "",
        pathname: "**",
      },
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
