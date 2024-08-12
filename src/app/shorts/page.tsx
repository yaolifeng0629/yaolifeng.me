import { Box, Card, Inset, Text } from '@radix-ui/themes';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getShorts, Short } from '@/api/shorts';

export const revalidate = 60;

const Page: NextPage = async () => {
    const shorts = await getShorts();

    return (
        <>
            <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新片段</h2>
            <Box my="4" className="columns-3xs space-y-4">
                {shorts.map((short) => (
                    <ShortItem key={short.slug} short={short} />
                ))}
            </Box>
        </>
    );
};

function ShortItem({ short }: { short: Short }) {
    const photo = short.url;
    if (!photo) return null;

    return (
        <Card size="2" className="border border-[#2f2f2f] rounded-lg p-0 overflow-hidden">
            <Link href={`/shorts/${short.slug}`} className="flex flex-col">
                <Inset clip="padding-box" side="top" pb="current">
                    <Image
                        src={photo}
                        alt={short.title}
                        width={300}
                        height={200}
                        layout="responsive"
                    />
                </Inset>
                <Text as="p" size="3" className="px-3 py-3 text-gray-50">
                    {short.title || short.description}
                </Text>
            </Link>
        </Card>
    );
}

export default Page;
