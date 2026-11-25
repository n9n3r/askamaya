import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ["*.e2b.app", "localhost", "127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
