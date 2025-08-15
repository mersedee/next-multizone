import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    transpilePackages: ['@multizone-app/ui'],
    async rewrites() {
        return [
            // Blog zone routing
            {
                source: '/blog',
                destination: `${process.env.BLOG_DOMAIN}/blog`,
            },
            {
                source: '/blog/:path+',
                destination: `${process.env.BLOG_DOMAIN}/blog/:path+`,
            },
            {
                source: '/blog-static/:path+',
                destination: `${process.env.BLOG_DOMAIN}/blog-static/:path+`,
            },
            // Dashboard zone routing
            {
                source: '/dashboard',
                destination: `${process.env.DASHBOARD_DOMAIN}/dashboard`,
            },
            {
                source: '/dashboard/:path+',
                destination: `${process.env.DASHBOARD_DOMAIN}/dashboard/:path+`,
            },
            {
                source: '/dashboard-static/:path+',
                destination: `${process.env.DASHBOARD_DOMAIN}/dashboard-static/:path+`,
            },
        ]
    },
};

export default nextConfig;
