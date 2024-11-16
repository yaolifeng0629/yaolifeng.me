'use client';

import Head from 'next/head';

import Back from '@/components/back';
import { BytemdViewer } from '@/components/bytemd';
import Tag from '@/components/tag';
import { Wrapper } from '@/components/wrapper';

import { cn, prettyDateWithWeekday } from '@/utils/utils';

import { PATHS } from '@/constants';

import { type Blog as Shorts } from './types';

type BlogDetailProps = {
    shorts: Shorts;
};

export const ShortsDetailPage = ({ shorts }: BlogDetailProps) => {
    return (
        <Wrapper className="flex flex-col overflow-x-hidden">
            <Back text="返回片段" href={PATHS.SITE_SNIPPET} />

            <Head>
                <title>{shorts.title}</title>
                <meta name="description" content={shorts.description} />
                <link rel="canonical" href={`/shorts/${shorts.slug}`} />
            </Head>

            <div className="flex items-center space-x-4 pb-4 pt-8 text-sm text-muted-foreground">
                <p>发布于&nbsp;&nbsp;{prettyDateWithWeekday(shorts.createdAt)}</p>
            </div>
            <h1 className="break-all py-6 text-4xl font-semibold">{shorts.title}</h1>

            <p className="py-4 text-neutral-500">{shorts.description}</p>

            {/* 内容 */}
            {shorts.content ? (
                <BytemdViewer body={shorts.content} />
            ) : (
                <div className="flex items-center justify-center w-full h-full">
                    <div className="flex justify-center items-center space-x-1 text-base text-[#737373]">
                        <svg
                            fill="none"
                            className="w-6 h-6 animate-spin"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clip-rule="evenodd"
                                d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                                fill="currentColor"
                                fill-rule="evenodd"
                            />
                        </svg>

                        <div>加载中 ...</div>
                    </div>
                </div>
            )}
            <div className="flex h-5 items-center space-x-1 pb-10 mt-16">
                {shorts.tags.map((tag: string, index: React.Key | null | undefined) => (
                    <Tag text={tag} key={index} />
                ))}
            </div>

            <div className="pb-24 ">
                <Back text="返回片段" href={PATHS.SITE_SNIPPET} />
            </div>
        </Wrapper>
    );
};
