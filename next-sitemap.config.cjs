const siteUrl = process.env.SITE_URL || 'https://yaolifeng.com';

// more detail to: https://github.com/iamvishnusankar/next-sitemap

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl,
    exclude: ['/api/*'],
    generateRobotsTxt: true,
    sitemapSize: 7000, // default 5000
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
};
