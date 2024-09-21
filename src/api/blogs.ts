import blogsData from '@/data/posts/parsed/blogs';

export async function getBlogs() {
    return blogsData;
}

export async function getBlogBySlug(slug: string) {
    const blogs = await getBlogs();
    return blogs.find((blog) => blog.slug === slug) || null;
}
