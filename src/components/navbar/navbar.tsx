'use client';

import React, { useMemo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useScroll } from 'ahooks';

import RSS from "@/components/rss";
import { cn } from '@/utils/utils';

import { NICKNAME, PATHS, WEBSITE } from '@/constants';

import { navItems } from './config';
import { MobileNav } from './mobile-nav';

import { Logo } from '../logo';
import { NextLink } from '../next-link';

export const Navbar = () => {
    const scroll = useScroll(() => document);
    const pathname = usePathname();

    const memoizedNextLink = useMemo(() => (
        <NextLink href={PATHS.SITE_HOME} className={cn('mr-4 hidden sm:flex')} aria-label={NICKNAME}>
            <Logo />
            <span className="ml-2 text-base font-semibold text-primary">{WEBSITE}</span>
        </NextLink>
    ), []);

    const memoizedRSS = useMemo(() => <RSS />, []);

    return (
        <header
            className={cn(
                'w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0  flex justify-center z-10',
                (scroll?.top ?? 0) > 60 && 'bg-background/50 border-b border-[#232329]',
            )}
        >
            <div className="flex h-16 w-full justify-between items-center p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
                {memoizedNextLink}
                <div className="mr-8 hidden h-16 flex-1 items-center justify-end text-base font-medium sm:flex">
                    {navItems.map((el) => (
                        <Link
                            href={el.link}
                            key={el.link}
                            className={cn(
                                'font-normal text-sm text-muted-foreground transition-colors px-4 py-2',
                                'hover:font-semibold hover:text-primary ',
                                pathname === el.link && 'font-semibold text-primary',
                            )}
                        >
                            {el.label}
                        </Link>
                    ))}
                    {memoizedRSS}
                </div>
                <MobileNav />
            </div>
        </header>
    );
};
