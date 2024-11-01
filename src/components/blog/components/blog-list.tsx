import { Key } from 'react';

import { IllustrationNoContent } from '@/components/illustrations';

import { BlogListItem } from './blog-list-item';

import { type Blog } from '../types';

export const BlogList = ({ blogs }: Blog) => {
    if (!blogs.length) {
        return (
            <div className="grid place-content-center gap-8">
                <IllustrationNoContent className="size-[30vh]" />
                <h3 className="text-center text-2xl font-semibold tracking-tight">暂无Blog</h3>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 border-blue-700">
            {blogs.map((el: { id: Key | null | undefined }, idx: number) => (
                <BlogListItem blog={el} />
            ))}
        </ul>
    );
};
