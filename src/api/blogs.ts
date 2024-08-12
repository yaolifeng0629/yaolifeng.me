export async function getBlogs() {
    const blogsData = [
        {
            id: 1,
            slug: 'mysql-learn-note',
            createdAt: new Date().getTime(),
            title: 'MySQL 学习笔记',
            description: '重新开始学习 MySQL，记录学习笔记',
            tags: ['MySQL'],
            content: '## MySQL 学习笔记\n\n这里是 MySQL 学习的一些重要笔记。\n\n...'
        },
        {
            id: 2,
            slug: 'xcode-upload-error',
            createdAt: new Date().getTime(),
            title: 'Xcode 上传 app 时报错：You do not have required contracts to perform an operation',
            description:
                '使用 Xcode 构建完 app 后，上传到 TestFlight 时突然报错 You do not have required contracts to perform an operation，记录一下这个坑',
            tags: ['Xcode', 'iOS', 'TestFlight'],
            content:
                '## Xcode 上传 app 错误解决方案\n\n在使用 Xcode 上传 app 到 TestFlight 时遇到了以下错误：\n\n...'
        }
    ];
    return blogsData;
}

export async function getBlogBySlug(slug: string) {
    const blogs = await getBlogs();
    return blogs.find((blog) => blog.slug === slug) || null;
}
