import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // Allow build even with type errors to proceed
    ignoreBuildErrors: true,
  },
};

export default nextConfig;