/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
    sassOptions: {
        additionalData: '@import "@/styles/index.scss";'
    },
    compiler: {
        styledComponents: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qncdn.mopic.mozigu.net'
            }
        ]
    },
    reactStrictMode: false // Strict patterns are primarily used to identify unsafe lifecycles, outdated APIs, etc. However, in development mode, the component is executed twice, which means that the interface is called multiple times, so turn off the mode.
};

export default withBundleAnalyzer(nextConfig);
