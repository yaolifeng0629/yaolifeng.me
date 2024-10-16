import React from 'react';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import { PATHS } from '@/constants';
import { cn } from '@/utils/utils';

interface BackProps {
    text: string;
}

const Back: React.FC<BackProps> = ({ text }) => {
    return (
        <Link
            href={PATHS.SITE_BLOG}
            className={cn(
                'text-sm flex items-center space-x-1 transition-colors py-2',
                'text-muted-foreground hover:text-primary'
            )}
        >
            <MoveLeft className="size-3.5" />
            <span>{text}</span>
        </Link>
    );
};

export default Back;
