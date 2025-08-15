import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    basePath: '/dashboard',
    assetPrefix: '/dashboard-static',
    transpilePackages: ['@multizone-app/ui'],
};

export default nextConfig;
