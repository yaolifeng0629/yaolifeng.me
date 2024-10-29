'use client';

import React from 'react';

import { cn } from '@/utils/utils';

type DetailSidebarProps = React.PropsWithChildren;

export const DetailSidebar = ({ children }: DetailSidebarProps) => {
    return (
        <div
            className={cn(
                'h-fit pl-10 pr-4 py-10 sticky top-24 hidden',
                'wrapper:block wrapper:w-[200px] border-l border-l-[#2f2f2f]',
                '2xl:w-[240px]  '
            )}
        >
            {children}
        </div>
    );
};
