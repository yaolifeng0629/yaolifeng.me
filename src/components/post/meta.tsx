import { Flex } from '@radix-ui/themes'

import { AppLink } from '~/components/app-link'
import { client } from '~/lib/client'
import { env } from '~/lib/env'

import { RelativeDate } from './relative-date'
import { TagList } from './tag-list'

export async function PostMeta({
  slug,
  isPost,
}: {
  slug: string
  isPost?: boolean
}) {
  const { HANDLE } = env
  const [post, site] = await Promise.all([
    isPost
      ? client.post.getBySlug(HANDLE, slug)
      : client.page.getBySlug(HANDLE, slug),
    client.site.getInfo(HANDLE),
  ])
  if (!post)
    return null

  return (
    <Flex wrap="wrap" gap="4" align="center" my="3">
      <RelativeDate date={post.publishedAt} />
      <TagList tags={post.tags} />
      <AppLink href={`${site.xlogUrl}/${slug}`}>xLog</AppLink>
      <AppLink href="/">Back</AppLink>
    </Flex>
  )
}

export async function PageMeta({
  slug,
  isPost,
}: {
  slug: string
  isPost?: boolean
}) {
  const { HANDLE, SITE_URL } = env
  const [post, site] = await Promise.all([
    isPost
      ? client.post.getBySlug(HANDLE, slug)
      : client.page.getBySlug(HANDLE, slug),
    client.site.getInfo(HANDLE),
  ])
  if (!post)
    return null

  const { siteName, characterName } = site
  const { cover, summary } = post

  const siteTitle = siteName ?? characterName
  const title = post.title + (siteTitle ? ` - ${siteTitle}` : '')

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={summary} />
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="description" content={summary} />
      <meta property="og:description" content={summary} />
      <meta name="twitter:description" content={summary} />
      <meta name="twitter:card" content="summary_large_image" />
      {SITE_URL && <meta property="og:url" content={SITE_URL} />}
      {cover && (
        <>
          <meta property="og:image" content={cover} />
          <meta name="twitter:image" content={cover} />
        </>
      )}
    </>
  )
}
