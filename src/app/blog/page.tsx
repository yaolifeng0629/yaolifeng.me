import React from 'react';

import { BlogList } from '@/components/blog';
import { Wrapper } from '@/components/wrapper';

async function getBlogs() {
    const blogsData = [
        {
            id: 1,
            slug: 'test',
            createdAt: new Date().getTime(),
            title: '测试',
            description: '描述',
            tags: ['MySql'],
            content: '<h2><code>高效开发方法总结</code></h2>'
        }
    ];
    return blogsData;
}

export const revalidate = 60; // 设置重新验证时间为60秒

export default async function Page() {
    const blogs = await getBlogs();

    return (
        <Wrapper className="flex min-h-screen flex-col px-6 pb-24 pt-8 ">
            <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新文章</h2>
            <BlogList blogs={blogs} />
        </Wrapper>
    );
}
