import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "443",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
        port: "443",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "443",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.nhcarrigan.com",
        port: "443",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.dicebear.com",
        port: "443",
        pathname: "**",
      },
    ],
    formats: ["image/webp"],
  },
  compress: true,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkPrism],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
