// import { Box, Card, Inset, Text } from '@radix-ui/themes';
// import Image from 'next/image';
// import type { Short } from 'sakuin';

// import { getImageDimensionByUri } from '~/app/utils';
// import { AppLink } from '~/components/app-link';
// import { client } from '~/lib/client';
// import { env } from '~/lib/env';

// export default async function ShortPage() {
//     const { list: shorts } = await client.short.getMany(env.HANDLE);

//     return (
//         <Box my="4" className="columns-3xs space-y-4">
//             {shorts.map((short) => (
//                 <ShortItem key={short.slug} short={short} />
//             ))}
//         </Box>
//     );
// }

// async function ShortItem({ short }: { short: Short }) {
//     const photos = short.attachments?.at(0)?.address;
//     if (!photos) return null;

//     const { xlogUrl } = await client.site.getInfo(env.HANDLE);
//     const size = await getImageDimensionByUri(photos);

//     return (
//         <Card size="2">
//             <AppLink href={`${xlogUrl}/${short.slug}`} key={short.slug} underline="none">
//                 <Inset clip="padding-box" side="top" pb="current">
//                     <Image
//                         src={photos}
//                         alt={short.content}
//                         width={size?.width}
//                         height={size?.height}
//                     />
//                 </Inset>
//                 <Text as="p" size="3">
//                     {short.title || short.content}
//                 </Text>
//             </AppLink>
//         </Card>
//     );
// }

import { NextPage } from 'next';

interface Props {}

const Page: NextPage<Props> = ({}) => {
    return <div>Shorts</div>;
};

export default Page;
