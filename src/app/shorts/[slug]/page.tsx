import { isNil } from 'lodash-es';
import { notFound } from 'next/navigation';

import { ShortsDetailPage } from '@/components/shorts';

import { getShortBySlug } from '@/api/shorts';
import type { Metadata } from 'next';

// 兼容 cloudflare pages
export const runtime = 'edge';

export const metadata: Metadata = {
    title: '姚利锋 | 片段',
    description: '姚利锋 | 片段'
};
export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
    const shorts = await getShortBySlug(params.slug);

    if (isNil(shorts)) {
        return notFound();
    }

    return <ShortsDetailPage shorts={shorts} />;
}
