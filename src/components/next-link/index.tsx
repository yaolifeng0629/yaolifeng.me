import Link from 'next/link';

import { cn } from '@/utils/utils';

export type NextLinkProps = React.ComponentProps<typeof Link>;

export const NextLink = ({ className, children, ...props }: NextLinkProps) => {
    return (
        <Link
            {...props}
            className={cn(
                `flex items-center rounded-2xl px-3 py-3 text-sm font-medium text-white hover:bg-transparent focus:outline-none`
            )}
        >
            {children}
        </Link>
    );
};
