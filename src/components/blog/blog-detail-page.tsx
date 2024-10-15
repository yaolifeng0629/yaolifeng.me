'use client';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

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
                    {blog.content ? <BytemdViewer body={blog.content} /> : <p>加载中...</p>}
                    {/* 内容 */}
                </div>
                <DetailSidebar>
                    <MarkdownTOC />
                </DetailSidebar>
            </div>
            <div className="flex h-5 items-center space-x-1 pb-24">
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
