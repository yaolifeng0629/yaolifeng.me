export interface Short {
    slug: string;
    content: string;
    url: string;
    createdAt: number;
    description: string;
    tags?: string[];
    title: string;
}

export async function getShorts(): Promise<Short[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        {
            slug: 'beautiful-sunset',
            url: 'https://qncdn.mopic.mozigu.net/work/143/24/2a3c7e14e8624d38/home.jpg',
            createdAt: new Date().getTime(),
            title: 'Xcode 上传 app 时报错：You do not have required contracts to perform an operation',
            description:
                '使用 Xcode 构建完 app 后，上传到 TestFlight 时突然报错 You do not have required contracts to perform an operation，记录一下这个坑',
            tags: ['Xcode', 'iOS', 'TestFlight'],
            content:
                '## Xcode 上传 app 错误解决方案\n\n在使用 Xcode 上传 app 到 TestFlight 时遇到了以下错误：\n\n...'
        },
        {
            slug: 'coding-night',
            url: 'https://qncdn.mopic.mozigu.net/work/143/24/8b11a05c46454bbb/small142532erPhI1653027933.jpg',
            createdAt: new Date().getTime(),
            title: '深夜编程',
            description: '又是一个被代码支配的夜晚...',
            tags: ['编程', '夜晚'],
            content:
                '## 深夜编程\\n\\n又是一个被代码支配的夜晚...\\n\\n深夜里，键盘的敲击声伴随着咖啡的香气，代码在屏幕上不断流动。虽然疲惫，但是当看到程序终于运行成功的那一刻，一切都值得了。'
        },
        {
            slug: 'morning-coffee',
            url: 'https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/1268a335a8fa/screen.png',
            createdAt: new Date().getTime(),
            title: '早晨咖啡时光',
            description: '美好的一天从一杯咖啡开始',
            tags: ['咖啡', '早晨'],
            content:
                '## 早晨咖啡时光\\n\\n美好的一天从一杯咖啡开始\\n\\n清晨的第一缕阳光透过窗户，伴随着咖啡机的声音，一天的美好就此开始。香浓的咖啡不仅唤醒了味蕾，也唤醒了思维，为一天的工作注入活力。'
        },
        {
            slug: 'weekend-hike',
            url: 'https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126890cb4d9c/9bSnjEfyk9dnb619aef403db0e1fb4ef568be18a732a.jpg',
            createdAt: new Date().getTime(),
            title: '周末远足',
            description: '探索大自然，呼吸新鲜空气',
            tags: ['远足', '周末', '自然'],
            content:
                '## 周末远足\\n\\n探索大自然，呼吸新鲜空气\\n\\n离开了繁忙的城市，走进大自然的怀抱。山间的小径、清新的空气、鸟儿的鸣叫，一切都让人心旷神怡。这样的周末远足不仅让身体得到放松，也让心灵找到了宁静。'
        },
        {
            slug: 'new-gadget',
            url: 'https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126890caabfc/15465.png',
            createdAt: new Date().getTime(),
            title: '新玩意儿上手',
            description: '刚入手的新玩意儿，爱不释手！',
            tags: ['科技', '新品'],
            content:
                '## 新玩意儿上手\\n\\n刚入手的新玩意儿，爱不释手！\\n\\n总是对新科技充满好奇心，这次入手的新设备真是让人兴奋不已。从开箱到设置，每一步都充满期待。虽然还在学习如何充分利用它的功能，但已经迫不及待想要分享使用体验了。'
        }
    ];
}

export async function getShortBySlug(slug: string): Promise<Short | null> {
    const shorts = await getShorts();
    return shorts.find((short) => short.slug === slug) || null;
}
