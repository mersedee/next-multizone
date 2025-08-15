import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    basePath: '/blog',
    assetPrefix: '/blog-static',
    transpilePackages: ['@multizone-app/ui'],
};

export default nextConfig;
