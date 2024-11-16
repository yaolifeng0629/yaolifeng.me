'use client';

import React, { useMemo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MenuIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import RSS from "@/components/rss";
import { cn } from '@/utils/utils';

import { SLOGAN, WEBSITE } from '@/constants';

import { navItems } from './config';

export const MobileNav = React.memo(() => {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);

    const triggerButton = useMemo(() => (
        <Button variant={'outline'} size={'icon'} aria-label="菜单" className={cn('sm:hidden')}>
            <MenuIcon className="size-4" />
        </Button>
    ), []);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {triggerButton}
            </SheetTrigger>
            <SheetContent side={'left'} className='pl-0'>
                <SheetHeader>
                    <SheetTitle>{WEBSITE}</SheetTitle>
                    <SheetDescription>{SLOGAN}</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 pt-8">
                    {navItems.map((el) => (
                        <Link
                            key={el.link}
                            href={el.link}
                            className={cn(
                                buttonVariants({
                                    variant: pathname === el.link ? 'default' : 'ghost',
                                }),
                                'text-md px-4 py-2 flex gap-2 items-center !justify-start w-full',
                            )}
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            {el.label}
                        </Link>
                    ))}
                    <div className='mt-4 pl-4'>
                        <RSS/>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
});;
