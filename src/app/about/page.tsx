import Link from 'next/link';

import { SocialMedia } from '@/components/home';
import {
    IconBrandGithub,
    IconLogoBing,
    IconLogoGoogle,
    IconSkillCSS,
    IconSkillVue,
    IconSkillJquery,
    IconSkillJava,
    IconSkillDocker,
    IconSkillFigmaDark,
    IconSkillFigmaLight,
    IconSkillHTML,
    IconSkillJavaScript,
    IconSkillMysqlDark,
    IconSkillMysqlLight,
    IconSkillNextjsDark,
    IconSkillNextjsLight,
    IconSkillNginx,
    IconSkillNodejsDark,
    IconSkillNodejsLight,
    IconSkillReactDark,
    IconSkillReactLight,
    IconSkillStackoverflowDark,
    IconSkillStackoverflowLight,
    IconSkillTailwindcssDark,
    IconSkillTailwindcssLight,
    IconSkillTypeScript
} from '@/components/icons';
import { Button } from '@/components/ui/button';

import { NICKNAME } from '@/constants';

export const revalidate = 60;

export default function Page() {
    let delay = 0;

    // 每次调用，增加延时
    const getDelay = () => (delay += 200);

    return (
        <section className="w-screen-wrapper prose prose-invert max-w-none pb-48">
            <h2 className="text-3xl font-bold md:text-4xl">关于</h2>
            <div
                className="animate-fade-up animate-ease-in-out"
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <h2>我是谁</h2>
                <p>
                    Hi~ 我是{NICKNAME}
                    ，一名前端开发工程师，喜欢 Coding 和 Immersion
                </p>
            </div>

            <div
                className="animate-fade-up animate-ease-in-out"
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <h2>我的技能</h2>
            </div>

            <div
                className="animate-fade-up animate-ease-in-out"
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <h3>前端</h3>
                <ul>
                    <li>
                        <IconSkillVue className="mx-1 translate-y-0.5" /> Vue +
                        <IconSkillJavaScript className="mx-1 translate-y-0.5" />
                        JavaScript，熟练使用
                    </li>
                    <li className="flex items-center">
                        <IconSkillHTML className="mx-1 translate-y-0.5" /> HTML +
                        <IconSkillCSS className="mx-1 translate-y-0.5" />
                        CSS + <IconSkillJquery className="mx-1 translate-y-0.5" />
                        jQuery ，熟练使用
                    </li>
                    <li>
                        <IconSkillTypeScript className="mx-1 translate-y-0.5" />
                        TypeScript +
                        <>
                            <IconSkillReactDark className="mx-1 translate-y-0.5 dark:hidden" />
                            <IconSkillReactLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
                        </>
                        React +
                        <>
                            <IconSkillNextjsDark className="mx-1 translate-y-0.5 dark:hidden" />
                            <IconSkillNextjsLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
                        </>
                        Next.js +
                        <>
                            <IconSkillTailwindcssDark className="mx-1 translate-y-0.5 dark:hidden" />
                            <IconSkillTailwindcssLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
                        </>
                        Tailwind CSS，熟练使用
                    </li>
                </ul>
            </div>
            <div
                className="animate-fade-up animate-ease-in-out"
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <h3>后端</h3>
                <ul>
                    <li>
                        <IconSkillJava className="mx-1 translate-y-0.5 dark:hidden" />
                        Java，简单会一点点
                    </li>
                    <li>
                        <>
                            <IconSkillNodejsDark className="mx-1 translate-y-0.5 dark:hidden" />
                            <IconSkillNodejsLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
                        </>
                        Node.js，简单 CRUD 水平
                    </li>
                    <li>
                        <>
                            <IconSkillNextjsDark className="mx-1 translate-y-0.5 dark:hidden" />
                            <IconSkillNextjsLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
                        </>
                        Next.js +
                        <>
                            <IconSkillMysqlDark className="mx-1 translate-y-0.5 dark:hidden" />
                            <IconSkillMysqlLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
                        </>
                        MySQL 搞全栈开发
                    </li>
                </ul>
            </div>
            <div
                className="animate-fade-up animate-ease-in-out"
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <h3>其它</h3>
                <ul>
                    <li>wezTerm + Fira Code，舒服的很</li>
                    {/* <li>
                        用过 <IconLogoCentOS className="mx-1 translate-y-0.5" />
                        CentOS、
                        <>
                            <IconSkillDebianDark className="mx-1 translate-y-0.5 dark:hidden" />
                            <IconSkillDebianLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
                        </>
                        Debian、
                        <IconLogoRockyLinux className="mx-1 translate-y-0.5" />
                        Rocky Linux （最近使用）
                    </li> */}
                    <li>
                        <IconSkillDocker className="mx-1 translate-y-0.5" />
                        Docker +<span className="line-through">Docker Desktop 太卡了</span>+
                        Orbstack，Docker 本地起数据库服务是真的方便
                    </li>
                    <li>
                        使用
                        <span className="line-through">
                            <IconSkillNginx className="mx-1 translate-y-0.5" />
                            NGINX （相比 Caddy 配置有点麻烦）
                        </span>
                        、 Caddy （配置超简单，无需手动配置 HTTPS 证书），反向代理 + 配置 HTTPS +
                        开启 HTTP2
                    </li>
                    <li>
                        <>
                            <IconSkillFigmaDark className="mx-1 translate-y-0.5 dark:hidden" />
                            <IconSkillFigmaLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
                        </>
                        Figma，会一点，用来画画图标，制作博客封面非常方便
                    </li>
                    <li>
                        熟练使用 <IconLogoGoogle className="mx-1 translate-y-0.5" />
                        Google/
                        <IconLogoBing className="mx-1 translate-y-0.5" />
                        Bing 搜索
                        <span className="ml-1 line-through">百度（浪费生命）</span> +
                        <IconBrandGithub className="mx-1 translate-y-0.5" />
                        GitHub +
                        <>
                            <IconSkillStackoverflowDark className="mx-1 translate-y-0.5 dark:hidden" />
                            <IconSkillStackoverflowLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
                        </>
                        Stack Overflow + Chat GPT 解决遇到的各种问题，复制粘贴我最行 🙋
                    </li>
                </ul>
            </div>

            <div
                className="animate-fade-up animate-ease-in-out"
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <h2>我的设备</h2>
                <ul>
                    <li>
                        Colorful i7-13700HX/4060/2k Size：16G + 1TB，
                        <span className="line-through">从最开始到现在的第二台笔记本</span>
                        🙃
                    </li>
                    <li>七彩虹将星 x15：16G + 1TB + i7-13700HX/4060</li>
                    <li>165HZ / 2K</li>
                    <li>键盘：（ikbc）K108 红轴</li>
                    <li>鼠标：罗技（G102紫色） 2代</li>
                </ul>
            </div>

            <div
                className="animate-fade-up animate-ease-in-out"
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <h2>联系我</h2>
                <p>你可以通过👇下面任意一种方式联系我</p>
                <ul className="!mb-0 flex !list-none items-center space-x-4 !pl-0">
                    {SocialMedia.map((el) => (
                        <li key={el.link}>
                            <Button asChild variant="outline" size="icon">
                                <Link href={el.link} target="_blank">
                                    {el.icon}
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
