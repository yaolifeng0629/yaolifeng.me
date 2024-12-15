import React from 'react';

import { MarkdownTOC } from '@/components/markdown-toc';

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <div className="flex min-h-screen w-full">
            <div className="flex-1 container mx-auto">
                <div className="flex flex-col md:flex-row gap-3">
                    <article className="flex-1">{children}</article>
                    <aside className="hidden md:block w-[230px] flex-shrink-0">
                        <MarkdownTOC />
                    </aside>
                </div>
            </div>
        </div>
    );
}
