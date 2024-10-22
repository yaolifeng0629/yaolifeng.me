import { Box, Card, Inset, Text } from '@radix-ui/themes';
import { NextPage } from 'next';
import Link from 'next/link';
import ShortImg from '@/components/short-img'

import { getShort, Short } from '@/api/shorts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '姚利锋 | 片段',
    description: '姚利锋 | 片段'
};
export const revalidate = 60;

const Page: NextPage = async () => {
    const shorts = await getShort();

    return (
        <>
            <h2 className="pb-8 text-3xl font-bold md:text-4xl px-6 pt-8">最新片段</h2>
            <Box my="4" className="columns-3xs space-y-4 px-6 mb-24">
                {shorts.map((short: any) => (
                    <ShortItem key={short.id} short={short} />
                ))}
            </Box>
        </>
    );
};

function ShortItem({ short }: { short: Short }) {
    const photo = short.url;

    return (
        <Card size="2" className="border border-[#2f2f2f] rounded-[8px] p-0 overflow-hidden">
            <Link href={`/shorts/${short.slug}`} className="flex flex-col">
                {
                    photo ?
                        <Inset clip="padding-box" side="top" pb="current" className='flex justify-center'>
                            <img
                                src={photo}
                                alt={short.title}
                            />
                        </Inset> : <ShortImg text={short.description} />
                }
                <Text as="p" size="3" className="px-3 py-3 text-gray-50">
                    {short.title || short.description}
                </Text>
            </Link>
        </Card>
    );
}

export default Page;
