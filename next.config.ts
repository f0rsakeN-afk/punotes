import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",

  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: false,

  reloadOnOnline: true,

  disable: process.env.NODE_ENV === "development" || process.env.CI === "true",

  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  output: "standalone",

  productionBrowserSourceMaps: false,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent huge client bundles
      config.optimization.splitChunks = {
        chunks: "all",
        maxInitialRequests: 25,
        minSize: 20000,
      };
    }
    return config;
  },

  turbopack: {},

  images: {
    remotePatterns: [],
  },

  poweredByHeader: false,
  reactStrictMode: true,
};

export default withPWA(nextConfig);
