import { NextResponse } from 'next/server';

import { Feed } from 'feed';
import fs from 'fs';
import { marked } from 'marked';
import path from 'path';

import blogPosts from '@/data/posts/parsed/blogs';
import shorts from '@/data/shorts/parsed/shorts';

const SITE_URL = process.env.VERCEL_URL;

const AUTHOR = {
    name: '姚利锋',
    email: 'yaolifeng666@gmail.com',
    link: `${SITE_URL}/about`,
};

// 博客文章类型定义
interface BlogPost {
    id: string;
    url?: string;
    slug: string;
    createdAt: number;
    title: string;
    description: string;
    tags: string[];
    content: string;
}

// Shorts类型定义
interface Short {
    id: string;
    url: string;
    slug: string;
    createdAt: number;
    title: string;
    description: string;
    tags: string[];
    content: string;
}

// 统一的内容类型
type ContentItem = BlogPost | Short;

// 从文件系统读取 Markdown 内容
async function getMarkdownContent(filePath: string): Promise<string> {
    try {
        const fullPath = path.join(process.cwd(), 'public', filePath);
        const content = await fs.promises.readFile(fullPath, 'utf-8');
        return content;
    } catch (error) {
        console.error(`Error reading markdown file: ${filePath}`, error);
        return '';
    }
}

// 处理单个内容项
async function processContentItem(item: ContentItem, type: 'blog' | 'short', feed: Feed) {
    try {
        const markdownContent = await getMarkdownContent(item.content);
        const htmlContent = marked(markdownContent);

        feed.addItem({
            title: `${type === 'blog' ? '【博客】' : '【片段】'}${item.title}`,
            id: item.id,
            url: `${SITE_URL}/${type === 'blog' ? 'blog' : 'shorts'}/${item.slug}`,
            link: `${SITE_URL}/${type === 'blog' ? 'blog' : 'shorts'}/${item.slug}`,
            description: item.description,
            author: [AUTHOR],
            contributor: [AUTHOR],
            content: htmlContent,
            date: new Date(item.createdAt),
            category: [{ name: type === 'blog' ? 'Blog' : 'Short' }, ...item.tags.map((tag) => ({ name: tag }))],
        });
    } catch (error) {
        console.error(`Error processing ${type} ${item.slug}:`, error);
    }
}

export async function GET() {
    try {
        const feed = new Feed({
            title: '姚利锋',
            description: '一个简单，平凡的前端记录者',
            id: SITE_URL,
            link: SITE_URL,
            language: 'zh-CN',
            favicon: `${SITE_URL}/images/Immerse-dark.svg`,
            copyright: `All rights reserved ${new Date().getFullYear()}`,
            updated: new Date(),
            generator: 'Feed for Node.js',
            author: AUTHOR,
            feedLinks: {
                rss2: `${SITE_URL}/api/rss`, // XML format
                json: `${SITE_URL}/api/rss?format=json`, // JSON format
            },
        });

        // 合并并按时间排序所有内容
        const allContent = [
            ...blogPosts.map((post) => ({ ...post, type: 'blog' as const })),
            ...shorts.map((short) => ({ ...short, type: 'short' as const })),
        ].sort((a, b) => b.createdAt - a.createdAt);

        // 处理所有内容
        for (const item of allContent) {
            await processContentItem(item, item.type, feed);
        }

        // 设置响应头和内容
        return new NextResponse(feed.rss2(), {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate',
            },
        });
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        return NextResponse.json({ error: 'Error generating RSS feed' }, { status: 500 });
    }
}
