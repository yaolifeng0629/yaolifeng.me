import React, { useState, useEffect } from 'react';

import { BlogList } from '@/components/blog';
import { Wrapper } from '@/components/wrapper';

import defaultArticle from '@/data/posts/parsed/高效开发方法.json';

export const revalidate = 60;

export default function Page() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // 假设fetchBlogs是一个异步函数，用于获取博客列表
        const fetchBlogs = async () => {
            // 模拟异步获取数据
            const blogsData = [
                {
                    id: 1,
                    title: '测试',
                    description: '描述',
                    tags: ['MySql'],
                    content: '<h2><code>高效开发方法总结</code></h2>'
                }
                // 假设这里有更多的博客数据
            ];
            setBlogs(blogsData);
        };

        fetchBlogs();
    }, []); // 空依赖数组意味着这个effect只在组件挂载时运行一次

    return (
        <Wrapper className="flex min-h-screen flex-col px-6 pb-24 pt-8">
            <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新文章</h2>
            <BlogList blogs={blogs} />
        </Wrapper>
    );
}
