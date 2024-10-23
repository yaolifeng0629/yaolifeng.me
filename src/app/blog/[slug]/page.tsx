import { isNil } from 'lodash-es';
import { notFound } from 'next/navigation';

import { BlogDetailPage } from '@/components/blog';
import type { Metadata } from 'next';
import { getBlogBySlug } from '@/api/blogs';

// 兼容 cloudflare pages
export const runtime = 'edge';

export const metadata: Metadata = {
    title: '姚利锋 | 博客',
    description: '姚利锋 | 博客'
};
export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
    const blog = await getBlogBySlug(params.slug);

    if (isNil(blog)) {
        return notFound();
    }

    return <BlogDetailPage blog={blog} />;
}
