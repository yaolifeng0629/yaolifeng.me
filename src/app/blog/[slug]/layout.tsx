import React from 'react';

import { MarkdownTOC } from '@/components/markdown-toc';

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 container gap-3">
                <main className="flex-1 scroll-smooth max-w-[calc(100%-250px)]">{children}</main>
                <aside className="w-[230px]">
                    <MarkdownTOC />
                </aside>
            </div>
        </div>
    );
}
