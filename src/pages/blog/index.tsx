import { BlogList } from '@/components/blog';
import { Wrapper } from '@/components/wrapper';

export const revalidate = 60;

export default async function Page() {
    const blogs: never[] = [];
    return (
        <Wrapper className="flex min-h-screen flex-col px-6 pb-24 pt-8">
            <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新文章</h2>
            <BlogList blogs={blogs} />
        </Wrapper>
    );
}
