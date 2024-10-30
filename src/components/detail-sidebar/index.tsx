'use client';
import React from 'react';
import { cn } from '@/utils/utils';
type DetailSidebarProps = React.PropsWithChildren;
export const DetailSidebar = ({ children }: DetailSidebarProps) => {
    return (
        <div
            className={cn(
                'pl-2 py-10 hidden box-border',
                'wrapper:block wrapper:w-[200px] border-l border-l-[#2f2f2f]',
                'scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent'
            )}
        >
            {children}
        </div>
    );
};
