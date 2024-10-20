import { isNil } from 'lodash-es';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

import { BlogDetailPage } from '@/components/blog';

import { getBlogBySlug } from '@/api/blogs';

export const revalidate = 60;

async function getBlogContent(contentPath: string) {
    const cleanPath = contentPath.replace(/^import\('/, '').replace(/'\)$/, '');

    const trimmedPath = cleanPath.startsWith('@/') ? cleanPath.slice(2) : cleanPath;

    const fullPath = path.join(process.cwd(), trimmedPath);

    try {
        const content = await fs.readFile(fullPath, 'utf-8');
        return content;
    } catch (error) {
        console.error('Error reading blog content:', error);
        return '';
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const blog = await getBlogBySlug(params.slug);

    if (isNil(blog)) {
        return notFound();
    }

    const content = await getBlogContent(blog.content);

    return <BlogDetailPage blog={{ ...blog, content }} />;
}
