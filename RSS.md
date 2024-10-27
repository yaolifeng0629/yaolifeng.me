### First

```ts
import type { NextApiRequest, NextApiResponse } from 'next';

import { Feed } from 'feed';
import { marked } from 'marked';
import path from 'path';

import fs from 'fs/promises';

// 博客文章类型定义
interface BlogPost {
    id: string;
    url: string;
    slug: string;
    createdAt: number;
    title: string;
    description: string;
    tags: string[];
    content: string;
}

// 从文件系统读取 Markdown 内容
async function getMarkdownContent(filePath: string): Promise<string> {
    try {
        const fullPath = path.join(process.cwd(), 'public', filePath);
        const content = await fs.readFile(fullPath, 'utf-8');
        return content;
    } catch (error) {
        console.error(`Error reading markdown file: ${filePath}`, error);
        return '';
    }
}

// 获取所有博客文章数据
async function getAllPosts(): Promise<BlogPost[]> {
    try {
        // 这里替换为你实际存储博客数据的 JSON 文件路径
        const dataPath = path.join(process.cwd(), 'public', 'blog-data.json');
        const jsonContent = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(jsonContent);
    } catch (error) {
        console.error('Error reading blog data:', error);
        return [];
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // 创建新的 Feed 实例
        const feed = new Feed({
            title: 'Your Blog Name',
            description: 'Your blog description',
            id: 'https://yourdomain.com/',
            link: 'https://yourdomain.com/',
            language: 'zh-CN',
            favicon: 'https://yourdomain.com/favicon.ico',
            copyright: `All rights reserved ${new Date().getFullYear()}`,
            author: {
                name: 'Your Name',
                email: 'your@email.com',
                link: 'https://yourdomain.com/about',
            },
        });

        // 获取所有博客文章
        const posts = await getAllPosts();

        // 处理每篇文章
        for (const post of posts) {
            // 读取 Markdown 内容
            const markdownContent = await getMarkdownContent(post.content);
            // 转换 Markdown 为 HTML
            const htmlContent = marked(markdownContent);

            feed.addItem({
                title: post.title,
                id: post.id,
                link: `https://yourdomain.com/blog/${post.slug}`,
                description: post.description,
                content: htmlContent,
                date: new Date(post.createdAt),
                category: post.tags.map((tag) => ({ name: tag })),
            });
        }

        // 设置适当的内容类型头
        res.setHeader('Content-Type', 'application/xml');
        // 生成 RSS feed
        res.write(feed.rss2());
        res.end();
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        res.status(500).json({ error: 'Error generating RSS feed' });
    }
}
```

### Second

```ts
import type { NextApiRequest, NextApiResponse } from 'next';

import { Feed } from 'feed';

// 假设这是你的博客文章数据获取函数
async function getAllPosts() {
    // 实现你的博客文章获取逻辑
    return [
        {
            title: '示例文章',
            slug: 'example-post',
            excerpt: '这是一篇示例文章的摘要',
            content: '这是示例文章的完整内容...',
            date: new Date(),
            author: {
                name: '作者名称',
                email: 'author@example.com',
            },
        },
    ];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // 创建新的 Feed 实例
        const feed = new Feed({
            title: '我的个人博客',
            description: '分享技术文章和个人见解',
            id: 'https://yourblog.com/',
            link: 'https://yourblog.com/',
            language: 'zh-CN', // 设置语言
            favicon: 'https://yourblog.com/favicon.ico',
            copyright: `All rights reserved ${new Date().getFullYear()}`,
            author: {
                name: '你的名字',
                email: 'your@email.com',
                link: 'https://yourblog.com/about',
            },
        });

        // 获取所有博客文章
        const posts = await getAllPosts();

        // 将文章添加到 Feed 中
        posts.forEach((post) => {
            feed.addItem({
                title: post.title,
                id: `https://yourblog.com/posts/${post.slug}`,
                link: `https://yourblog.com/posts/${post.slug}`,
                description: post.excerpt,
                content: post.content,
                author: [
                    {
                        name: post.author.name,
                        email: post.author.email,
                    },
                ],
                date: post.date,
            });
        });

        // 设置适当的内容类型头
        res.setHeader('Content-Type', 'application/xml');
        // 生成 RSS feed
        res.write(feed.rss2());
        res.end();
    } catch (error) {
        console.error('生成 RSS feed 时出错:', error);
        res.status(500).json({ error: '生成 RSS feed 时出错' });
    }
}

// 在你的 pages/_document.tsx 中添加以下内容：
/*
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for My Blog"
          href="/api/rss"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
*/
```
