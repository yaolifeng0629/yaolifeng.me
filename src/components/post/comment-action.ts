'use server';

import { revalidatePath } from 'next/cache';
import type { CommentInput } from 'sakuin';

import { client } from '~/lib/client';
import { env } from '~/lib/env';

export async function createComment(formData: FormData) {
    'use server';

    const rawFormData: CommentInput = {
        content: (formData.get('content') as string) || '',
        email: (formData.get('email') as string) || '',
        name: (formData.get('name') as string) || '',
        url: (formData.get('url') as string) || '',
        targetNoteId: Number(formData.get('noteId')),
        targetCharacterId: await client.getCharacterId(env.HANDLE)
    };

    await client.comment.putAnonymous(rawFormData);
    revalidatePath('/post/[slug]', 'page');
}
