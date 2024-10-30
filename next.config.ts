import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/uno-test",
  output: "export",
  images: {
    unoptimized: true,
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
