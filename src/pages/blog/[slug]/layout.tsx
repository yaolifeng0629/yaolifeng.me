import React from 'react';

// import { isNil } from 'lodash-es';
// import { type Metadata } from 'next';

// export async function generateMetadata({
//     params
// }: {
//     params: { slug: string };
// }): Promise<Metadata> {
//     const blog: never[] = [];
//     if (isNil(blog)) {
//         return {};
//     }
//     return {
//         title: `测试`,
//         description: '测试描述',
//         keywords: ['JavaScript']
//     };
// }

export default function Layout({ children }: React.PropsWithChildren) {
    return <>{children}</>;
}
