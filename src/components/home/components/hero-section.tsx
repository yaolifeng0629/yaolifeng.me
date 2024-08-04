import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

import socialMediaList from './social-media';
import TypeIntro from './type-intro';

import { NICKNAME, PATHS } from '@/constants';
import { cn } from '@/lib/utils';

const HeroSection = () => {
    let delay = 0;

    // 每次调用，增加延时
    const getDelay = () => (delay += 200);

    return (
        <div className="flex flex-col justify-center gap-5 px-6 md:px-10 ">
            <p
                className="animate-fade-up text-2xl tracking-widest animate-ease-in-out md:text-5xl"
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                Hi there, I'm
            </p>
            <strong
                className={cn(
                    `text-5xl md:text-8xl tracking-widest font-black  bg-clip-text  custom-strong bg-gradient-to-r from-cyan-400 to-blue-500`,
                    'animate-fade-up animate-ease-in-out'
                )}
                style={{
                    WebkitTextFillColor: 'transparent',
                    animationDelay: `${getDelay()}ms`
                }}
            >
                {NICKNAME}
                <strong
                    className={cn(
                        `text-3xl md:text-5xl tracking-widest font-black  bg-clip-text  custom-strong bg-gradient-to-r from-cyan-400 to-blue-500`,
                        'animate-fade-up animate-ease-in-out'
                    )}
                    style={{
                        WebkitTextFillColor: 'transparent',
                        animationDelay: `${getDelay()}ms`
                    }}
                >
                    &nbsp;| Immerse
                </strong>
            </strong>
            <div
                className={cn('animate-fade-up animate-ease-in-out')}
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <TypeIntro />
            </div>
            <p
                className={cn(
                    'text-2xl md:text-5xl tracking-widest',
                    'animate-fade-up animate-ease-in-out'
                )}
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                Like&nbsp;
                <span className={`font-semibold text-[#45ca9d]`}>Vue</span>、
                <span className={`font-semibold text-[#00d8ff]`}>React</span>、
                {/* <span className={`font-semibold text-[#5bac47]`}>Node</span>、 */}
                {/* <span className={`font-semibold text-[#fcc72b]`}>Vitest</span>、 */}
                <span className={`font-semibold text-[#007acc]`}>TypeScript</span>
                <span className="ml-4">\owo/ ~</span>
            </p>
            <p
                className={cn(
                    'text-base md:text-2xl text-[#a3a3a3] tracking-widest',
                    'animate-fade-up animate-ease-in-out'
                )}
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                Record your daily life here and strive 💪 to Become a simple and better yourself
            </p>
            <div
                className={cn('flex space-x-4', 'animate-fade-up animate-ease-in-out')}
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <Link href={PATHS.SITE_BLOG} className={cn(buttonVariants({ variant: 'outline' }))}>
                    我的博客
                </Link>
                <Link
                    href={PATHS.SITE_ABOUT}
                    className={cn(buttonVariants({ variant: 'outline' }))}
                >
                    关于我
                </Link>
            </div>
            <ul
                className={cn('flex space-x-4', 'animate-fade-up animate-ease-in-out')}
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                {socialMediaList.map((el) => (
                    <li key={el.link}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button asChild variant="outline" size="icon">
                                        <Link href={el.link} target="_blank">
                                            {el.icon}
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{el.label}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HeroSection;
