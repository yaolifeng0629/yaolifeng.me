import React from 'react';

import { cn } from '@/utils/utils';

export const IconSkillVue = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[logos--vue]', className)}></span>;
};
