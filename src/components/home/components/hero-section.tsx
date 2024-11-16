import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

import socialMediaList from './social-media';
import TypeIntro from './type-intro';

import { NICKNAME, PATHS } from '@/constants';
import { cn } from '@/utils/utils';

const HeroSection = () => {
    let delay = 0;

    const getDelay = () => (delay += 200);

    return (
        <div className="flex flex-col justify-center gap-3 md:gap-5 px-4 md:px-10 px-5">
            <p
                className="animate-fade-up text-xl md:text-5xl tracking-widest animate-ease-in-out"
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                你好，我是
            </p>
            <strong
                className={cn(
                    `text-3xl md:text-8xl tracking-widest font-black bg-clip-text custom-strong bg-gradient-to-r from-cyan-400 to-blue-500`,
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
                        `text-2xl md:text-5xl tracking-widest font-black bg-clip-text custom-strong bg-gradient-to-r from-cyan-400 to-blue-500`,
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
                    'text-xl md:text-5xl tracking-widest leading-relaxed',
                    'animate-fade-up animate-ease-in-out'
                )}
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                喜欢&nbsp;
                <span className={`font-semibold text-[#45ca9d]`}>Vue</span>、
                <span className={`font-semibold text-[#00d8ff]`}>React</span>、
                <span className={`font-semibold text-[#007acc]`}>TypeScript</span>
                <span className="ml-2">\owo/ ~</span>
            </p>
            <p
                className={cn(
                    'text-sm md:text-2xl text-[#a3a3a3] tracking-widest',
                    'animate-fade-up animate-ease-in-out'
                )}
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                在这里记录我的日常，做一个简单、更好的自己💪
            </p>
            <div
                className={cn('flex space-x-3 md:space-x-4 mt-2', 'animate-fade-up animate-ease-in-out')}
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                <Link
                    href={PATHS.SITE_BLOG}
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'text-sm md:text-base px-3 py-2 md:px-4 md:py-2'
                    )}
                >
                    我的博客
                </Link>
                <Link
                    href={PATHS.SITE_ABOUT}
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'text-sm md:text-base px-3 py-2 md:px-4 md:py-2'
                    )}
                >
                    关于我
                </Link>
            </div>
            <ul
                className={cn('flex space-x-3 md:space-x-4 mt-2', 'animate-fade-up animate-ease-in-out')}
                style={{
                    animationDelay: `${getDelay()}ms`
                }}
            >
                {socialMediaList.map((el) => (
                    <li key={el.link}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="icon"
                                        className="w-8 h-8 md:w-10 md:h-10"
                                    >
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
