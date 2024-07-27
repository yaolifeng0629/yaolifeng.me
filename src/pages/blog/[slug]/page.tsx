import { notFound } from 'next/navigation';

import { isNil } from 'lodash-es';

import { BlogDetailPage } from '@/components/blog';

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
    const blog: never[] = [];
    if (isNil(blog)) {
        return notFound();
    }

    return <BlogDetailPage blog={blog} />;
}
