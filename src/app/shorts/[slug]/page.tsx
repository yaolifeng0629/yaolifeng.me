import { isNil } from 'lodash-es';
import { notFound } from 'next/navigation';

import { ShortsDetailPage } from '@/components/shorts';

import { getShortBySlug } from '@/api/shorts';

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
    const shorts = await getShortBySlug(params.slug);

    if (isNil(shorts)) {
        return notFound();
    }

    return <ShortsDetailPage shorts={shorts} />;
}
