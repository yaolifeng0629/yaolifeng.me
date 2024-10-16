import React from 'react';

import { cn } from '@/utils/utils';

export const IconLogoRockyLinux = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[logos--rocky-linux-icon]', className)}></span>;
};
