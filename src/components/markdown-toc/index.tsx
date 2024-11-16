'use client';

import React, { memo, useEffect, useState } from 'react';

import Link from 'next/link';

import { useMount } from 'ahooks';
import { load } from 'cheerio';

import { type OptionItem } from '@/types';

interface TocItem extends OptionItem<string> {
    level: 'h2' | 'h3';
}

export const MarkdownTOC = memo(() => {
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
                    level,
                });
            }
        });

        setTocList(toc);
    });

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const headings = document.querySelectorAll('.markdown-body h2, .markdown-body h3');
    //         let currentActiveId = '';

    //         headings.forEach((heading) => {
    //             const { top } = heading.getBoundingClientRect();
    //             if (top <= 100) {
    //                 currentActiveId = heading.id;
    //             }
    //         });

    //         setActiveId(currentActiveId);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    return (
        <div className="sticky top-[100px] space-y-4 px-4 py-4 border bg-card text-card-foreground shadow-sm mb-20 rounded-md">
            <div>目录</div>
            <ul className="flex flex-col gap-2 pt-3 text-sm text-muted-foreground scrollbar-none">
                {tocList.length > 0 ? (
                    tocList.map((el) => (
                        <li
                            key={el.value}
                            className={`
                                ${el.level === 'h3' ? 'pl-4 text-[12px]' : ''}
                                ${activeId === el.value ? 'font-bold text-primary' : ''}
                            `}
                        >
                            <Link
                                href={`#${el.value}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById(el.value);
                                    if (element) {
                                        const offsetTop = element.offsetTop;
                                        window.scrollTo({
                                            top: offsetTop - 100, // 减去100px的偏移量，考虑到顶部导航栏
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
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
        </div>
    );
});
