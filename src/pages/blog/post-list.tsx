'use client';

import { useState, useTransition } from 'react';
import type { Post } from 'sakuin';

import { fetchMorePost } from './action';
import { PostItem } from './post-item';

export function PostList({ posts, cursor }: { posts: Post[]; cursor: string | null }) {
    const [currentPosts, setCurrentPosts] = useState(posts);
    const [currentCursor, setCurrentCursor] = useState(cursor);
    const [isLoadMorePending, startLoadMoreTransition] = useTransition();

    return (
        <>
            {currentPosts.map((post) => (
                <PostItem key={post.slug} post={post} />
            ))}
            {/* {currentCursor && (
                <button
                    type="button"
                    onClick={() => {
                        startLoadMoreTransition(async () => {
                            const { posts, cursor } = await fetchMorePost(currentCursor);
                            setCurrentPosts([...currentPosts, ...posts]);
                            setCurrentCursor(cursor);
                        });
                    }}
                    disabled={isLoadMorePending}
                    className="px-2 py-1 rounded-full hover:bg-gray-2 disabled:hover:bg-inherit opacity-60 hover:opacity-100 disabled:opacity-20"
                >
                    {isLoadMorePending ? (
                        <span className="ml-2 i-lucide-loader-2 animate-spin" />
                    ) : (
                        <span>Next</span>
                    )}
                </button>
            )} */}
        </>
    );
}
