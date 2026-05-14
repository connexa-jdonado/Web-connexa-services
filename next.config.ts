import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      { pathname: '/assets/**' },
    ],
  },
};

export default nextConfig;
