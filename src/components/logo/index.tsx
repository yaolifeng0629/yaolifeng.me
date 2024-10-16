import React from 'react';
import Image from 'next/image';

import { ImageAssets, WEBSITE } from '@/constants';
import { cn } from '@/utils/utils';

type Props = {
    className?: string;
};

export const Logo = ({ className }: Props) => {
    return (
        <>
            <Image src={ImageAssets.logoLight} width={32} height={32} className={cn('w-8 h-8', className)} alt={WEBSITE} />
        </>
    );
};
