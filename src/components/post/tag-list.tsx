import type { BadgeProps } from '@radix-ui/themes'
import { Badge, Flex } from '@radix-ui/themes'

type TagListProps = { tags: string[] } & BadgeProps

export function TagList({ tags, ...props }: TagListProps) {
  return (
    <Flex gap="2">
      {tags.map(tag => (
        <Badge key={tag} variant="surface" radius="large" {...props}>
          {tag}
        </Badge>
      ))}
    </Flex>
  )
}
