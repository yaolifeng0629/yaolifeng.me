import blogsData from '@/data/posts/parsed/blogs';
import fs from 'fs/promises';
import path from 'path';

export async function getBlogs() {
    return blogsData;
}

export async function getBlogBySlug(slug: string) {
    const blogs = await getBlogs();
    const blog = blogs.find((blog) => blog.slug === slug);
    if (!blog) return null;

    const cleanPath = blog.content.replace(/^import\('/, '').replace(/'\)$/, '');
    const trimmedPath = cleanPath.startsWith('@/') ? cleanPath.slice(2) : cleanPath;
    const fullPath = path.join(process.cwd(), trimmedPath);

    try {
        const content = await fs.readFile(fullPath, 'utf-8');
        return { ...blog, content };
    } catch (error) {
        console.error('Error reading blog content:', error);
        return { ...blog, content: '' };
    }
}
