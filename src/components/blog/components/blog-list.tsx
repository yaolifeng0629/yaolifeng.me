import { Key } from 'react';

import { IllustrationNoContent } from '@/components/illustrations';

import { type Blog } from '../types';

import { BlogListItem } from './blog-list-item';

type BlogListProps = {
    blog: never;
};

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
                <li
                    key={el.id}
                    className="animate-fade-up animate-ease-in-out"
                    style={{
                        animationDelay: `${(idx + 1) * 200}ms`
                    }}
                >
                    <BlogListItem blog={el} />
                </li>
            ))}
        </ul>
    );
};
