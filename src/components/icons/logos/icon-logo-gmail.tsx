import React from 'react';

import { cn } from '@/utils/utils';

export const IconLogoGmail = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[logos--google-gmail]', className)}></span>;
};
