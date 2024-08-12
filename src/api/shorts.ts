export interface Short {
    slug: string;
    content: string;
    title?: string;
    attachments?: {
        address: string;
    }[];
}

export async function getShorts(): Promise<Short[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        {
            slug: 'beautiful-sunset',
            content: '今天的日落真是太美了！',
            attachments: [
                {
                    address: 'https://qncdn.mopic.mozigu.net/work/143/24/2a3c7e14e8624d38/home.jpg'
                }
            ]
        },
        {
            slug: 'coding-night',
            title: '深夜编程',
            content: '又是一个被代码支配的夜晚...',
            attachments: [
                {
                    address:
                        'https://qncdn.mopic.mozigu.net/work/143/24/8b11a05c46454bbb/small142532erPhI1653027933.jpg'
                }
            ]
        },
        {
            slug: 'morning-coffee',
            content: '美好的一天从一杯咖啡开始',
            attachments: [
                {
                    address:
                        'https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/1268a335a8fa/screen.png'
                }
            ]
        },
        {
            slug: 'weekend-hike',
            title: '周末远足',
            content: '探索大自然，呼吸新鲜空气',
            attachments: [
                {
                    address:
                        'https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126890cb4d9c/9bSnjEfyk9dnb619aef403db0e1fb4ef568be18a732a.jpg'
                }
            ]
        },
        {
            slug: 'new-gadget',
            content: '刚入手的新玩意儿，爱不释手！',
            attachments: [
                {
                    address:
                        'https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126890caabfc/15465.png'
                }
            ]
        }
    ];
}

export async function getShortBySlug(slug: string): Promise<Short | null> {
    const shorts = await getShorts();
    return shorts.find((short) => short.slug === slug) || null;
}
