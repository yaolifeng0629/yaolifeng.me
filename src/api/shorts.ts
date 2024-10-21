import { promises as fs } from 'fs';
import path from 'path';

import shortsData from '@/data/shorts/parsed/shorts';

export interface Short {
    slug: string;
    content: string;
    url: string;
    createdAt: number;
    description: string;
    tags?: string[];
    title: string;
}

export async function getShort() {
    return shortsData;
}

export async function getShortBySlug(slug: string) {
    const shorts = await getShort();
    const short = shorts.find((short: { slug: string }) => short.slug === slug);
    if (!short) return null;

    try {
        const relativePath = short.content.replace(/^\//, '');

        const filePath = path.join(process.cwd(), 'public', relativePath);

        const content = await fs.readFile(filePath, 'utf-8');

        return { ...short, content };
    } catch (error) {
        console.error('Error reading short content:', error);
        return { ...short, content: '' };
    }
}
