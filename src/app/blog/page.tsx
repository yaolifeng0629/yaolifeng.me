import React from 'react';

import { BlogList } from '@/components/blog';
import { Wrapper } from '@/components/wrapper';

async function getBlogs() {
    const blogsData = [
        {
            id: 1,
            slug: 'mysql-learn-note',
            createdAt: new Date().getTime(),
            title: 'MySQL 学习笔记',
            description: '重新开始学习 MySQL，记录学习笔记',
            tags: ['MySql'],
            content: '<h2><code>高效开发方法总结</code></h2>'
        },
        {
            id: 2,
            slug: 'test',
            createdAt: new Date().getTime(),
            title: 'Xcode 上传 app 时报错：You do not have required contracts to perform an operation',
            description:
                '使用 Xcode 构建完 app 后，上传到 TestFlight 时突然报错 You do not have required contracts to perform an operation，记录一下这个坑',
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
        <Wrapper className="flex flex-col px-6 pb-24 pt-8 ">
            <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新文章</h2>
            <BlogList blogs={blogs} />
        </Wrapper>
    );
}
