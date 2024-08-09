import { isNil } from 'lodash-es';
import { notFound } from 'next/navigation';

import { BlogDetailPage } from '@/components/blog';

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
    console.log('Params:', params); // 这会在服务器端控制台显示

    // 假设这里有一个异步函数来获取博客数据
    // const blog = await fetchBlogBySlug(params.slug);
    const blog = null; // 暂时设置为 null 以测试 notFound() 逻辑

    if (isNil(blog)) {
        return notFound();
    }

    return <BlogDetailPage blog={blog} />;
}
