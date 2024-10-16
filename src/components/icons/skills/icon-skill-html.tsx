import React from 'react';

import { cn } from '@/utils/utils';

export const IconSkillHTML = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[skill-icons--html]', className)}></span>;
};
