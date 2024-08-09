import React from 'react';

import { BlogList } from '@/components/blog';
import { Wrapper } from '@/components/wrapper';

async function getBlogs() {
    const blogsData = [
        {
            id: 1,
            slug: 'mysql-learn-note',
            createdAt: new Date().getTime(),
            title: 'MySQL 学习笔记',
            description: '重新开始学习 MySQL，记录学习笔记',
            tags: ['MySQL'],
            content:
                '## MySQL 学习笔记\\n\\n这里是 MySQL 学习的一些重要笔记。\\n\\n### 1. 基础操作\\n\\n- 创建数据库\\n- 创建表\\n- 插入数据\\n\\n### 2. 高级查询\\n\\n- JOIN 操作\\n- 子查询\\n- 索引优化'
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
                '## Xcode 上传 app 错误解决方案\\n\\n在使用 Xcode 上传 app 到 TestFlight 时遇到了以下错误：\\n\\n```\\nYou do not have required contracts to perform an operation\\n```\\n\\n### 解决步骤\\n\\n1. 登录 Apple Developer 账户\\n2. 检查合同状态\\n3. 更新必要的协议\\n4. 重新尝试上传\\n\\n如果问题仍然存在，请联系 Apple 开发者支持。'
        }
    ];
    return blogsData;
}

export const revalidate = 60; // 设置重新验证时间为60秒

export default async function Page() {
    const blogs = await getBlogs();

    return (
        <Wrapper className="flex flex-col px-6 pb-24 pt-8">
            <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新文章</h2>
            <BlogList blogs={blogs} />
        </Wrapper>
    );
}
