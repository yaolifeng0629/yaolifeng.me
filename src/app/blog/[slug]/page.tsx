import { isNil } from 'lodash-es';
import { notFound } from 'next/navigation';

import { BlogDetailPage } from '@/components/blog';

import { getBlogBySlug } from '@/api/blogs';

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
    const blog = await getBlogBySlug(params.slug);

    if (isNil(blog)) {
        return notFound();
    }

    return <BlogDetailPage blog={blog} />;
}
