import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    disableOptimizedLoading: true,
  },
};

export default nextConfig;
