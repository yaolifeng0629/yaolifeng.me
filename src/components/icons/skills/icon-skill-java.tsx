import React from 'react';

import { cn } from '@/utils/utils';

export const IconSkillJava = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[devicon--java]', className)}></span>;
};
