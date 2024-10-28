import React from 'react';

import Link from 'next/link';

import { Calendar } from 'lucide-react';

import Tag from '@/components/tag';
// import TagList from '@/components/tag-list';

import { cn, prettyDate } from '@/utils/utils';

import { PATHS } from '@/constants';

import { type Blog } from '../types';

type BlogListItemProps = {
    blog: Blog;
};

export const BlogListItem = ({ blog }: BlogListItemProps) => {
    return (
        <Link
            href={`${PATHS.SITE_BLOG}/${blog.slug}`}
            className={cn(
                'flex flex-col justify-between h-full text-primary px-6 py-4 transition-colors rounded-lg overflow-hidden',
                'bg-transparent hover:bg-primary-foreground',
            )}
        >
            <h4 className="mb-2 line-clamp-1 text-xl font-medium" title={blog.title}>{blog.title}</h4>
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground min-h-10 text-gray-300" title={blog.description}>{blog.description}</p>
            <div className="flex space-x-2 text-xs text-muted-foreground ">
                <div className="flex h-5 items-center space-x-1">
                    <Calendar className="size-3" />
                    <time dateTime={new Date(blog.createdAt).toISOString()}>{prettyDate(blog.createdAt)}</time>
                </div>
            </div>
            <div className="flex h-5 items-center space-x-1 mt-2">
                {/* <TagList tags={blog.tags}/> */}
                {blog.tags.map((tag: string, index: React.Key | null | undefined) => (
                    <Tag text={tag} key={index}/>
                ))}
            </div>
        </Link>
    );
};
