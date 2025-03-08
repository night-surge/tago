import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'build',

  images: {
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
    domains: ['ia801307.us.archive.org'],
  },
};

export default nextConfig;
