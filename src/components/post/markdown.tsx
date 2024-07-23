import { Code } from '@radix-ui/themes';
import rehypeShiki from '@shikijs/rehype';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Tweet } from 'react-tweet';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkGithubAlerts from 'remark-github-alerts';
import remarkParse from 'remark-parse';

import { getImageDimensionByUri } from '~/app/utils';
import { AppLink } from '~/components/app-link';

import { GitHubCard } from './github-card';
import { rehypeEmbed, transformers } from './rehype-embed';

export function Markdown({ content }: { content: string }) {
    return (
        <MDXRemote
            source={content}
            components={{
                // @ts-expect-error types are not up-to-date with React 19
                a: AppLink,
                // @ts-expect-error types are not up-to-date with React 19
                code: (props) => <Code variant="soft" {...props} />,
                // @ts-expect-error types are not up-to-date with React 19
                img: async (props) => {
                    if (!props.src) return null;

                    const size = await getImageDimensionByUri(props.src);
                    if (!size)
                        // @ts-expect-error types are not up-to-date with React 19
                        return <img {...props} />;
                    return (
                        <Image width={size.width} height={size.height} {...(props as ImageProps)} />
                    );
                },
                tweet: ({ id }: { id: string }) => (
                    <div className="not-prose">
                        <Tweet id={id} />
                    </div>
                ),
                'github-repo': ({ repo }: { repo: string }) => <GitHubCard repo={repo} />
            }}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkParse, remarkGithubAlerts, remarkGfm],
                    rehypePlugins: [
                        rehypeRaw,
                        [rehypeEmbed, { transformers }],
                        [rehypeShiki, { themes: { light: 'solarized-light', dark: 'tokyo-night' } }]
                    ],
                    format: 'md'
                }
            }}
        />
    );
}
