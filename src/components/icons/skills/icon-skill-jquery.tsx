import React from 'react';

import { cn } from '@/utils/utils';

export const IconSkillJquery = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[devicon--jquery]', className)}></span>;
};
