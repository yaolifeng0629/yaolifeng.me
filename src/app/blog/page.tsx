import React from 'react';

import { BlogList } from '@/components/blog';
import { Wrapper } from '@/components/wrapper';
import type { Metadata } from 'next';
import { getBlogs } from '@/api/blogs';

export const metadata: Metadata = {
    title: '姚利锋 | 博客',
    description: '姚利锋 | 博客'
};

export const runtime = "edge";

export const revalidate = 60;

export default async function Page() {
    const blogs = await getBlogs();

    return (
        <Wrapper className="flex flex-col px-6 pb-24 pt-8">
            <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新文章</h2>
            <BlogList blogs={blogs} />
        </Wrapper>
    );
}
