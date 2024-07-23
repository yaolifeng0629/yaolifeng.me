import { Flex, Heading, Text } from '@radix-ui/themes';
import type { Post } from 'sakuin';

import { AppLink } from '~/components/app-link';
import { RelativeDate } from '~/components/post/relative-date';
import { TagList } from '~/components/post/tag-list';

export function PostItem({ post }: { post: Post }) {
    return (
        <Flex direction="column" mt="4" mb="6" asChild>
            <AppLink href={`post/${post.slug}`} raw className="group">
                <Flex align="center" gap="2" my="4">
                    <Heading as="h2" size="4">
                        {post.title}
                    </Heading>
                    <span className="i-lucide-arrow-right opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-transform" />
                </Flex>
                <Text className="line-clamp-3">{post.summary}</Text>
                <Flex align="center" gap="2" mt="4">
                    <RelativeDate date={post.publishedAt} />
                    <TagList tags={post.tags} />
                </Flex>
            </AppLink>
        </Flex>
    );
}
