import { promises as fs } from 'fs';
import path from 'path';

import blogsData from '@/data/posts/parsed/blogs';

export async function getBlogs() {
    return blogsData;
}

export async function getBlogBySlug(slug: string) {
    const blogs = await getBlogs();
    const blog = blogs.find((blog) => blog.slug === slug);
    if (!blog) return null;

    try {
        const relativePath = blog.content.replace(/^\//, '');

        const filePath = path.join(process.cwd(), 'public', relativePath);

        const content = await fs.readFile(filePath, 'utf-8');

        return { ...blog, content };
    } catch (error) {
        console.error('Error reading blog content:', error);
        return { ...blog, content: '' };
    }
}
