import MillionLint from '@million/lint';
import bundleAnalyzer from '@next/bundle-analyzer';
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // build 阶段禁止 eslint
    eslint: { ignoreDuringBuilds: true },
    // build 阶段禁止 ts 类型检查
    typescript: {
        ignoreBuildErrors: true,
    },
    compiler: {
        styledComponents: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qncdn.mopic.mozigu.net',
            },
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
    experimental: {
        // 解决 next build 报错: Error [ERR_REQUIRE_ESM]: require() of ES Module shiki/dist/index.mjs not supported.
        // 参考 issue: https://github.com/vercel/next.js/issues/64434#issuecomment-2082964050
        // 参考 issue: https://github.com/vercel/next.js/issues/64434#issuecomment-2084270758
        optimizePackageImports: ['shiki'],
        serverComponentsExternalPackages: ['fs', 'path'],
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: false, // Strict patterns are primarily used to identify unsafe lifecycles, outdated APIs, etc. However, in development mode, the component is executed twice, which means that the interface is called multiple times, so turn off the mode.
};

if (process.env.NODE_ENV === "development") {
    await setupDevPlatform();
}

const lastConfig = isProd
    ? withBundleAnalyzer(nextConfig)
    : MillionLint.next({ rsc: true })(withBundleAnalyzer(nextConfig));

export default lastConfig;
