import React from 'react';

import { cn } from '@/utils/utils';

export const IconBrandBilibili = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[fa6-brands--bilibili]', className)}></span>;
};
