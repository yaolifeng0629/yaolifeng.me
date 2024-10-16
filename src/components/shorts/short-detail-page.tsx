
import { BytemdViewer } from '@/components/bytemd';
import { DetailSidebar } from '@/components/detail-sidebar';
import { MarkdownTOC } from '@/components/markdown-toc';
import Tag from '@/components/tag';
import { Wrapper } from '@/components/wrapper';
import Back from '@/components/back';

import { type Blog as Shorts } from './types';

import { cn, prettyDateWithWeekday } from '@/utils/utils';

type BlogDetailProps = {
    shorts: Shorts;
};

export const ShortsDetailPage = ({ shorts }: BlogDetailProps) => {
    return (
        <Wrapper className="flex flex-col pt-8">
            <Back text='返回片段' />
            <div className="flex items-center space-x-4 pb-4 pt-8 text-sm text-muted-foreground">
                <p>发布于&nbsp;&nbsp;{prettyDateWithWeekday(shorts.createdAt)}</p>
            </div>
            <h1 className="break-all py-6 text-4xl font-semibold">{shorts.title}</h1>

            <p className="py-4 text-neutral-500">{shorts.description}</p>

            <div className="flex">
                <div className={cn('flex-1', 'border-r border-r-[#2f2f2f] wrapper:pr-14')}>
                    <BytemdViewer body={shorts.content || ''} />
                    <div className="flex h-5 items-center space-x-1">
                        <ul className="mb-1 flex space-x-4 text-xs font-medium text-muted-foreground">
                            {shorts.tags.map((tag: string, index: React.Key | null | undefined) => (
                                <li key={index} className="flex items-center">
                                    <Tag text={tag} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <DetailSidebar>
                    <MarkdownTOC />
                </DetailSidebar>
            </div>

        </Wrapper>
    );
};
