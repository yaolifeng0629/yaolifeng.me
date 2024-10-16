import React from 'react';

import { cn } from '@/utils/utils';

export const IconSkillGolang = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[skill-icons--golang]', className)}></span>;
};
