import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'challenge-uno.vercel.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
