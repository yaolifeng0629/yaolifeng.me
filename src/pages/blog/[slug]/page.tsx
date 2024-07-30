// import { isNil } from 'lodash-es';
// import { notFound } from 'next/navigation';

// import { BlogDetailPage } from '@/components/blog';

// export const revalidate = 60;

// export default async function Page({ params }: { params: { slug: string } }) {
//     const blog: never[] = [];
//     if (isNil(blog)) {
//         return notFound();
//     }

//     return <BlogDetailPage blog={blog} />;
// }

import { NextPage } from 'next';

interface Props {}

const Page: NextPage<Props> = ({}) => {
    return <div>blog detail</div>;
};

export default Page;
