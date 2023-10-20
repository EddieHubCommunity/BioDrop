import { withSentryConfig } from "@sentry/nextjs";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.nhcarrigan.com",
      },
      {
        protocol: "https",
        hostname: "avatars.dicebear.com",
      },
    ],
    formats: ["image/webp"],
  },
  compress: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, [remarkPrism, { transformInlineCode: true }]],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

export default withSentryConfig(
  withMDX(nextConfig),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // custom
    automaticVercelMonitors: false,
  },
);
