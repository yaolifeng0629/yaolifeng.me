'use client';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { BytemdViewer } from '@/components/bytemd';
import { DetailSidebar } from '@/components/detail-sidebar';
import { MarkdownTOC } from '@/components/markdown-toc';
import Tag from '@/components/tag';
import { Wrapper } from '@/components/wrapper';

import { type Blog } from './types';

import { PATHS } from '@/constants';
import { cn, prettyDateWithWeekday } from '@/lib/utils';

type BlogDetailProps = {
    blog: Blog;
};

export const BlogDetailPage = ({ blog }: BlogDetailProps) => {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        const loadContent = async () => {
            if (typeof blog.content === 'string' && blog.content.startsWith('import(')) {
                const path = blog.content.slice(8, -2); // 移除 import(' 和 ')
                try {
                    const module = await import(`../../${path}`);
                    const markdownContent = module.default;
                    setContent(markdownContent);
                } catch (error) {
                    console.error('加载博客内容失败:', error);
                    setContent('加载博客内容时出错。');
                }
            } else {
                setContent(blog.content || '');
            }
        };

        loadContent();
    }, [blog.content]);

    return (
        <Wrapper className="flex flex-col pt-8">
            <div>
                <Link
                    href={PATHS.SITE_BLOG}
                    className={cn(
                        'text-sm flex items-center space-x-1 transition-colors py-2',
                        'text-muted-foreground hover:text-primary'
                    )}
                >
                    <MoveLeft className="size-3.5" />
                    <span>返回博客</span>
                </Link>
            </div>
            <div className="flex items-center space-x-4 pb-4 pt-8 text-sm text-muted-foreground">
                <p>发布于&nbsp;&nbsp;{prettyDateWithWeekday(blog.createdAt)}</p>
            </div>
            <h1 className="break-all py-6 text-4xl font-semibold">{blog.title}</h1>

            <p className="py-4 text-neutral-500">{blog.description}</p>

            <div className="flex">
                <div className={cn('flex-1', 'border-r border-r-[#2f2f2f] wrapper:pr-14')}>
                    {content ? <BytemdViewer body={content} /> : <p>加载中...</p>}
                </div>
                <DetailSidebar>
                    <MarkdownTOC />
                </DetailSidebar>
            </div>
            <div className="flex h-5 items-center space-x-1">
                <ul className="mb-1 flex space-x-4 text-xs font-medium text-muted-foreground">
                    {blog.tags.map((tag: string, index: React.Key | null | undefined) => (
                        <li key={index} className="flex items-center">
                            <Tag text={tag} />
                        </li>
                    ))}
                </ul>
            </div>
        </Wrapper>
    );
};
