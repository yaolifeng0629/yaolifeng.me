import React from 'react';

import { cn } from '@/utils/utils';
export const IconLogoTwitter = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[logos--twitter]', className)}></span>;
};
