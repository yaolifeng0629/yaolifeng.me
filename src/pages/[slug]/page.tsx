import { notFound } from 'next/navigation';

import { Comment } from '~/components/post/comment';
import { Markdown } from '~/components/post/markdown';
import { PageMeta, PostMeta } from '~/components/post/meta';
import { client } from '~/lib/client';
import { env } from '~/lib/env';

export async function generateStaticParams() {
    const pages = await client.page.getAll(env.HANDLE);
    const slugs = pages.map((page) => page.slug);
    return slugs.map((slug) => ({ slug }));
}

export default async function PagePage({ params }: { params: { slug: string } }) {
    const { HANDLE } = env;
    const post = await client.page.getBySlug(HANDLE, params.slug);
    if (!post) notFound();

    return (
        <main className="antialiased prose dark:prose-invert break-words prose-pre:shadow-sm prose-img:shadow-sm">
            <PageMeta slug={params.slug} />
            <article>
                <PostMeta slug={params.slug} />
                <Markdown content={post.content} />
            </article>
            <Comment noteId={post.noteId} />
        </main>
    );
}
