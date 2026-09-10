import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",

  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,

  reloadOnOnline: true,

  disable: process.env.NODE_ENV === "development" || process.env.CI === "true",

  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,

  // Long-lived caching for versioned/static public assets.
  // (_next/static is immutable-cached by the platform automatically.)
  async headers() {
    return [
      {
        source: "/logo.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },

  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  poweredByHeader: false,
  reactStrictMode: true,
};

export default withPWA(nextConfig);
