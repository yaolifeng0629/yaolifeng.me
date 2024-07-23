import { Section } from '@radix-ui/themes'
import { Suspense } from 'react'

import { client } from '~/lib/client'
import { env } from '~/lib/env'

import { CommentListClient } from './comment-client'

export function Comment({ noteId }: { noteId: number }) {
  return (
    <Section size="2" className="prose max-w-full dark:prose-invert">
      <h2>Comments</h2>
      <Suspense fallback="Loading comments...">
        <CommentList noteId={noteId} />
      </Suspense>
    </Section>
  )
}

async function CommentList({ noteId }: { noteId: number }) {
  const comments = await client.comment.getAll(env.HANDLE, noteId)
  return <CommentListClient comments={comments} noteId={noteId} />
}
