'use client';
import { BytemdViewer } from '@/components/bytemd';
import { DetailSidebar } from '@/components/detail-sidebar';
import { MarkdownTOC } from '@/components/markdown-toc';
import Tag from '@/components/tag';
import { Wrapper } from '@/components/wrapper';
import Back from '@/components/back';

import { type Blog } from './types';
import { PATHS } from '@/constants';
import { cn, prettyDateWithWeekday } from '@/utils/utils';


type BlogDetailProps = {
    blog: Blog;
};

export const BlogDetailPage = ({ blog }: BlogDetailProps) => {
    return (
        <Wrapper className="flex flex-col pt-8 overflow-x-hidden">
            <Back text='返回博客' href={PATHS.SITE_BLOG} />
            <div className="flex items-center space-x-4 pb-4 pt-8 text-sm text-muted-foreground">
                <p>发布于&nbsp;&nbsp;{prettyDateWithWeekday(blog.createdAt)}</p>
            </div>
            <h1 className="break-all py-6 text-4xl font-semibold">{blog.title}</h1>

            <p className="py-4 text-neutral-500">{blog.description}</p>

            <div className="flex">
                <div className={cn('flex-1', 'border-r border-r-[#2f2f2f] wrapper:pr-14')}>
                    {/* 内容 */}
                    {blog.content ? <BytemdViewer body={blog.content} /> : <div className="flex items-center justify-center w-full h-full">
                        <div className="flex justify-center items-center space-x-1 text-base text-[#737373]">

                            <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                <path clip-rule='evenodd'
                                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                    fill='currentColor' fill-rule='evenodd' />
                            </svg>


                            <div>加载中 ...</div>
                        </div>
                    </div>}
                    <div className="flex h-5 items-center space-x-1 pb-10 mt-16">
                        <ul className="mb-1 flex space-x-4 text-xs font-medium text-muted-foreground">
                            {blog.tags.map((tag: string, index: React.Key | null | undefined) => (
                                <li key={index} className="flex items-center">
                                    <Tag text={tag} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='pb-24 '>
                        <Back text='返回博客' href={PATHS.SITE_BLOG} />
                    </div>
                </div>
                <DetailSidebar>
                    <MarkdownTOC />
                </DetailSidebar>
            </div>
        </Wrapper>
    );
};
