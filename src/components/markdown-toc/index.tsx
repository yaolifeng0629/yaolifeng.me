'use client';
import React, { useEffect, useState } from 'react';
import { useMount } from 'ahooks';
import { load } from 'cheerio';
import Link from 'next/link';
import { type OptionItem } from '@/types';

interface TocItem extends OptionItem<string> {
    level: 'h2' | 'h3';
}

export const MarkdownTOC = () => {
    const [tocList, setTocList] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useMount(() => {
        const markdownBodyElement = document.querySelector('.markdown-body')!;
        if (!markdownBodyElement) return;
        const $ = load(markdownBodyElement.innerHTML);
        const headings = $('h2, h3');

        const toc: TocItem[] = [];
        headings.each((_, element) => {
            const $element = $(element);
            const text = $element.text();
            const id = $element.attr('id');
            const level = $element.get(0)?.name as 'h2' | 'h3';

            if (text && id) {
                toc.push({
                    value: id,
                    label: text,
                    level
                });
            }
        });

        setTocList(toc);
    });

    useEffect(() => {
        const handleScroll = () => {
            const headings = document.querySelectorAll('.markdown-body h2, .markdown-body h3');
            let currentActiveId = '';

            headings.forEach((heading) => {
                const { top } = heading.getBoundingClientRect();
                if (top <= 100) {
                    currentActiveId = heading.id;
                }
            });

            setActiveId(currentActiveId);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div>目录</div>
            <ul className="flex flex-col gap-2 pt-8 text-sm text-muted-foreground overflow-y-auto scrollbar-none">
                {tocList.length > 0 ? (
                    tocList.map((el) => (
                        <li
                            key={el.value}
                            className={`
                                ${el.level === 'h3' ? 'pl-4 text-[13px]' : ''}
                                ${activeId === el.value ? 'font-bold text-primary' : ''}
                            `}
                        >
                            <Link
                                href={`#${el.value}`}
                                className="line-clamp-1 text-ellipsis transition-colors hover:text-primary"
                            >
                                {el.label}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>无目录</li>
                )}
            </ul>
        </>
    );
};
